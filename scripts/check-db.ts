import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkCounts() {
  console.log(`Checking DB: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  
  const tables = ['categories', 'products', 'product_images', 'coupons', 'orders'];
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
      
    if (error) {
       console.error(`Error fetching ${table}:`, error.message);
    } else {
       console.log(`Table ${table}: ${count} rows`);
    }
  }
}

checkCounts();
