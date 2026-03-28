import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Paths
const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

async function migrate() {
  console.log('🚀 Starting Supabase Migration...');

  // 1. Categories & Products
  if (fs.existsSync(PRODUCTS_FILE)) {
    console.log('\n📦 Migrating Products & Categories...');
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    
    // Extract unique categories
    const categoriesSet = new Set<string>();
    products.forEach((p: any) => {
      if (p.categories && Array.isArray(p.categories)) {
        p.categories.forEach((cat: string) => categoriesSet.add(cat));
      }
    });

    // Create Categories
    const categoryMap: Record<string, string> = {};
    for (const catName of Array.from(categoriesSet)) {
      const slug = catName.toLowerCase().replace(/\s+/g, '-');
      const { data, error } = await supabase
        .from('categories')
        .upsert({ name: catName, slug }, { onConflict: 'slug' })
        .select()
        .single();
      
      if (error) {
        console.error(`  - Failed to upsert category ${catName}:`, error.message);
      } else {
        categoryMap[catName] = data.id;
        console.log(`  ✓ Category: ${catName}`);
      }
    }

    // Create Products
    for (const p of products) {
      const catId = p.categories && p.categories.length > 0 ? categoryMap[p.categories[0]] : null;
      
      const { data: productData, error: productError } = await supabase
        .from('products')
        .upsert({
          name: p.name,
          slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
          description: p.description || '',
          short_description: p.short_description || '',
          price: p.price || 0,
          regular_price: p.regular_price || p.price || 0,
          sku: p.sku || '',
          stock_status: p.stock_status || 'instock',
          category_id: catId,
          tags: p.tags || []
        }, { onConflict: 'slug' })
        .select()
        .single();

      if (productError) {
        console.error(`  - Failed to upsert product ${p.name}:`, productError.message);
        continue;
      }

      console.log(`  ✓ Product: ${p.name}`);

      // Create Images
      if (p.images && Array.isArray(p.images)) {
        const images = p.images.map((url: string, index: number) => ({
          product_id: productData.id,
          url,
          position: index
        }));
        
        const { error: imgError } = await supabase
          .from('product_images')
          .insert(images);
        
        if (imgError) console.error(`    - Failed to insert images for ${p.name}:`, imgError.message);
      }
    }
  }

  // 2. Coupons
  if (fs.existsSync(COUPONS_FILE)) {
    console.log('\n🎫 Migrating Coupons...');
    const coupons = JSON.parse(fs.readFileSync(COUPONS_FILE, 'utf-8'));
    // Remove custom ID to let Supabase generate UUID, and map fields
    const formattedCoupons = coupons.map((c: any) => ({
      code: c.code.toUpperCase(),
      type: c.type,
      value: c.value,
      used_count: c.used_count || 0,
      created_at: c.created_at || new Date().toISOString()
    }));

    const { error } = await supabase.from('coupons').upsert(formattedCoupons, { onConflict: 'code' });
    if (error) console.error('  - Failed to migrate coupons:', error.message);
    else console.log(`  ✓ Migrated ${coupons.length} coupons`);
  }

  // 3. Orders
  if (fs.existsSync(ORDERS_FILE)) {
    console.log('\n🛒 Migrating Orders...');
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
    
    const formattedOrders = orders.map((o: any) => ({
      id: o.id,
      status: o.status || 'pending',
      customer_name: o.customer_name || 'Guest',
      email: o.email || '',
      address: o.address || '',
      city: o.city || '',
      zip: o.zip || '',
      country: o.country || 'US',
      items: o.items || [],
      cart_total: o.cartTotal || 0,
      discount_amount: o.discountAmount || 0,
      shipping_method: o.shippingMethod || '',
      shipping_cost: o.currentShippingCost || 0,
      grand_total: o.grandTotal || o.total_amount || 0,
      payment_method: o.paymentMethod || '',
      payment_status: 'paid', // Assuming migrated orders are paid
      created_at: o.created_at || new Date().toISOString()
    }));

    const { error } = await supabase.from('orders').upsert(formattedOrders, { onConflict: 'id' });
    if (error) console.error('  - Failed to migrate orders:', error.message);
    else console.log(`  ✓ Migrated ${orders.length} orders`);
  }

  // 4. Subscribers
  if (fs.existsSync(SUBSCRIBERS_FILE)) {
    console.log('\n📧 Migrating Subscribers...');
    const subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8'));
    const { error } = await supabase.from('subscribers').upsert(subscribers, { onConflict: 'email' });
    if (error) console.error('  - Failed to migrate subscribers:', error.message);
    else console.log(`  ✓ Migrated ${subscribers.length} subscribers`);
  }

  console.log('\n🏁 Migration Complete!');
}

migrate();
