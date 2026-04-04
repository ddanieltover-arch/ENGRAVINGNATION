import fs from 'fs';
import path from 'path';
import { supabase, createServiceClient } from './supabase';

export const PRODUCTS_FILE = path.join(process.cwd(), 'data/products.json');
export const ARTICLES_FILE = path.join(process.cwd(), 'data/articles.json');
export const ORDERS_FILE = path.join(process.cwd(), 'data/orders.json');
export const COUPONS_FILE = path.join(process.cwd(), 'data/coupons.json');
export const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data/subscribers.json');

// --- Legacy JSON Methods (Used for migration/fallback) ---

export function getJsonData(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

export function saveJsonData(filePath: string, data: any) {
  try {
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
}

// --- New Supabase Methods ---

function formatProduct(p: any) {
  if (!p) return null;
  return {
    ...p,
    price: Number(p.price),
    regular_price: p.regular_price ? Number(p.regular_price) : Number(p.price),
    images: p.product_images 
      ? p.product_images.sort((a: any, b: any) => a.position - b.position).map((img: any) => img.url)
      : [],
    // Flatten single category object or array into array of names
    categories: Array.isArray(p.categories) 
      ? p.categories.map((c: any) => c.name)
      : p.categories?.name ? [p.categories.name] : [],
    // Flatten product_fitments junction table into vehicle_fitment array
    vehicle_fitment: p.product_fitments 
      ? p.product_fitments.map((pf: any) => pf.vehicle_fitments).filter(Boolean)
      : []
  };
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*), product_fitments(vehicle_fitments(*))')
    .neq('slug', 'sys_settings');
  if (error) throw error;
  
  // Merge reviews and enhanced descriptions from local JSON as a fallback/overlay
  const localProducts = getJsonData(PRODUCTS_FILE);
  
  return data.map(p => {
    const formatted = formatProduct(p);
    const local = localProducts.find((lp: any) => lp.slug === p.slug);
    
    return {
      ...formatted,
      reviews: p.reviews && p.reviews.length > 0 ? p.reviews : (local?.reviews || []),
      description: (local?.description && local.description.includes('href=')) ? local.description : p.description
    };
  });
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*), product_fitments(vehicle_fitments(*))')
    .eq('slug', slug)
    .single();
  if (error) return null;
  
  const formatted = formatProduct(data);
  const localProducts = getJsonData(PRODUCTS_FILE);
  const local = localProducts.find((lp: any) => lp.slug === slug);
  
  return {
    ...formatted,
    reviews: data.reviews && data.reviews.length > 0 ? data.reviews : (local?.reviews || []),
    description: (local?.description && local.description.includes('href=')) ? local.description : data.description
  };
}

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });
  
  const localArticles = getJsonData(ARTICLES_FILE);
  
  // Merge Supabase results with local JSON fallback
  const dbData = data || [];
  const merged = [...dbData];
  
  localArticles.forEach((local: any) => {
    if (!merged.find(m => m.slug === local.slug)) {
      merged.push(local);
    }
  });

  // Filter out articles with future publish dates (Automated Scheduling)
  const now = new Date();
  const filtered = merged.filter(article => {
    const pubDateStr = article.published_at || article.publishedAt;
    return pubDateStr ? new Date(pubDateStr) <= now : true;
  });

  return filtered;
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (data) return data;
  
  const localArticles = getJsonData(ARTICLES_FILE);
  return localArticles.find((a: any) => a.slug === slug) || null;
}

const DEFAULT_SETTINGS = {
  payment_methods: [
    { id: 'zelle', name: 'Zelle', type: 'zelle', instructions: 'Send payment to:' },
    { id: 'cashapp', name: 'CashApp', type: 'cashapp', instructions: 'Send payment to:' },
    { id: 'applepay', name: 'Apple Pay', type: 'applepay', instructions: 'Send payment to:' },
    { id: 'bitcoin', name: 'Bitcoin', type: 'crypto', instructions: 'Send BTC to:' },
  ],
  shipping_zones: [
    { id: 'us-standard', name: 'Standard Shipping (US)', cost: 10.00 },
    { id: 'int-standard', name: 'International Shipping', cost: 25.00 },
  ]
};

export async function getSettings() {
  const { data, error } = await supabase
    .from('products')
    .select('dimensions')
    .eq('slug', 'sys_settings')
    .maybeSingle();
    
  if (error) console.error("Error fetching settings:", error);
  
  if (!data) {
    return DEFAULT_SETTINGS;
  }
  
  // Return the merged settings, ensuring arrays exist
  return {
    ...DEFAULT_SETTINGS,
    ...(data.dimensions || {})
  };
}

export async function updateSettings(newSettings: any) {
  const serviceClient = createServiceClient();
  
  // Fetch existing first to see if we need to insert or update
  const { data: existing } = await serviceClient
    .from('products')
    .select('id')
    .eq('slug', 'sys_settings')
    .maybeSingle();
    
  if (existing) {
    const { error } = await serviceClient
      .from('products')
      .update({ dimensions: newSettings })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    // Insert new dummy product record
    const { error } = await serviceClient
      .from('products')
      .insert({
        name: 'System Settings (DO NOT DELETE)',
        slug: 'sys_settings',
        price: 0,
        stock_quantity: 0,
        dimensions: newSettings,
        description: 'This is a system configuration record. Do not manually edit or delete.'
      });
    if (error) throw error;
  }
  
  return { success: true };
}

export async function getOrders() {
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}


export async function deleteProduct(identifier: string) {
  const serviceClient = createServiceClient();
  // Try deleting by UUID first, then by slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
  const column = isUUID ? 'id' : 'slug';
  const { error } = await serviceClient
    .from('products')
    .delete()
    .eq(column, identifier);
  if (error) throw error;
  return true;
}

export async function updateProduct(identifier: string, product: any) {
  const serviceClient = createServiceClient();
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
  const column = isUUID ? 'id' : 'slug';
  const { data, error } = await serviceClient
    .from('products')
    .update(product)
    .eq(column, identifier)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertProduct(product: any) {
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from('products')
    .upsert(product, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id: string, status: string) {
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function createCoupon(coupon: any) {
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from('coupons')
    .insert([coupon])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCoupon(id: string) {
  const serviceClient = createServiceClient();
  const { error } = await serviceClient
    .from('coupons')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

export async function addProductImage(product_id: string, url: string, position: number = 0) {
  const serviceClient = createServiceClient();
  const { error } = await serviceClient
    .from('product_images')
    .insert([{ product_id, url, position }]);
  if (error) throw error;
  return true;
}

export async function clearProductImages(product_id: string) {
  const serviceClient = createServiceClient();
  const { error } = await serviceClient
    .from('product_images')
    .delete()
    .eq('product_id', product_id);
  if (error) throw error;
  return true;
}

export async function createOrder(order: any) {
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from('orders')
    .insert([order])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOrder(id: string) {
  const serviceClient = createServiceClient();
  const { error } = await serviceClient
    .from('orders')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

export async function getCoupons() {
  const { data, error } = await supabase
    .from('coupons')
    .select('*');
  if (error) throw error;
  return data;
}

export async function addSubscriber(email: string) {
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from('subscribers')
    .insert([{ email }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function searchProducts(query: string) {
  if (!query || query.length < 2) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, price, product_images(url)')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .neq('slug', 'sys_settings')
    .limit(8);
    
  if (error) throw error;
  
  return data.map(p => ({
    ...p,
    price: Number(p.price),
    images: p.product_images?.map((img: any) => img.url) || []
  }));
}
