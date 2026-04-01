const { Client } = require('pg');

// Correct direct connection string for Supabase project dbnqxojbamfoexfrsext
const connectionString = 'postgresql://postgres:fbgdrrW445%23%24@dbnqxojbamfoexfrsext.supabase.co:5432/postgres';

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  console.log('Connecting to database...');
  await client.connect();
  
  console.log('Checking for reviews column...');
  const check = await client.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name='products' AND column_name='reviews';
  `);
  
  if (check.rowCount === 0) {
    console.log('Adding reviews column to products table...');
    await client.query('ALTER TABLE products ADD COLUMN reviews jsonb DEFAULT \'[]\'::jsonb;');
    console.log('Column added successfully.');
  } else {
    console.log('Reviews column already exists.');
  }
  
  await client.end();
}

run().catch((err) => {
  console.error('Database migration failed:', err.message);
  process.exit(1);
});
