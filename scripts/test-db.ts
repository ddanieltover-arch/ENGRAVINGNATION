import { getProducts } from '../lib/data';

async function testFetch() {
  try {
    const products = await getProducts();
    console.log(`Found ${products.length} products`);
    if (products.length > 0) {
      console.log('Sample product 1:');
      console.dir(products[0], { depth: null });
    }
  } catch (error) {
    console.error('Error fetching:', error);
  }
}

testFetch();
