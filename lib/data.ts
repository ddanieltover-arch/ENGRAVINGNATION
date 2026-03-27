import fs from 'fs';
import path from 'path';

export const PRODUCTS_FILE = path.join(process.cwd(), 'data/products.json');
export const ORDERS_FILE = path.join(process.cwd(), 'data/orders.json');
export const COUPONS_FILE = path.join(process.cwd(), 'data/coupons.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

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
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
}
