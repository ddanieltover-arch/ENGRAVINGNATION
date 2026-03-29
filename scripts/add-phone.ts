import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function addPhoneColumn() {
  const connectionString = `postgres://postgres.dbnqxojbamfoexfrsext:${process.env.SUPABASE_DB_PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
  
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to database');
    const res = await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT;');
    console.log('Column added successfully:', res);
  } catch (err) {
    console.error('Error adding column:', err);
  } finally {
    await client.end();
  }
}

addPhoneColumn();
