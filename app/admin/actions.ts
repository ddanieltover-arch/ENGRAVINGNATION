'use server';

import { revalidatePath } from 'next/cache';
import { getJsonData, saveJsonData, PRODUCTS_FILE, ORDERS_FILE, COUPONS_FILE } from '@/lib/data';

const getProducts = () => getJsonData(PRODUCTS_FILE);
const saveProducts = (data: any[]) => saveJsonData(PRODUCTS_FILE, data);

const getOrders = () => getJsonData(ORDERS_FILE);
const saveOrders = (data: any[]) => saveJsonData(ORDERS_FILE, data);



export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock_quantity = parseInt(formData.get('stock') as string) || null;
  const category = formData.get('category') as string;
  const imageUrls = formData.get('imageUrls') as string;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const images = imageUrls ? imageUrls.split(',').map(s => s.trim()).filter(Boolean) : [];
  const sku = 'EN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const newProduct = {
    name, slug, sku, description, short_description: description.substring(0, 100),
    price, regular_price: price, sale_price: null,
    stock_status: stock_quantity !== 0 ? 'instock' : 'outofstock',
    stock_quantity, categories: category ? [category] : [], images,
    id: Date.now().toString(), created_at: new Date().toISOString()
  };

  const products = getProducts();
  products.push(newProduct);
  saveProducts(products);

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  const products = getProducts();
  const index = products.findIndex((p: any) => p.slug === id || p.id === id);
  if (index === -1) return { error: 'Not found' };
  
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrls = formData.get('imageUrls') as string;
  const images = imageUrls ? imageUrls.split(',').map(s => s.trim()).filter(Boolean) : [];

  products[index] = {
    ...products[index],
    name,
    description: formData.get('description') as string,
    price,
    regular_price: price,
    stock_quantity: parseInt(formData.get('stock') as string) || null,
    categories: formData.get('category') ? [formData.get('category')] : products[index].categories,
    images: images.length > 0 ? images : products[index].images,
  };

  saveProducts(products);
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
  revalidatePath('/products');
  return { success: true };
}

export async function deleteProduct(id: string) {
  let products = getProducts();
  products = products.filter((p: any) => p.slug !== id && p.id !== id);
  saveProducts(products);

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

export async function updateOrderStatus(orderId: string, status: string) {
  const orders = getOrders();
  const index = orders.findIndex((o: any) => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    saveOrders(orders);
  }
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
  return { success: true };
}

export async function getCoupons() {
  return getJsonData(COUPONS_FILE);
}

export async function saveCoupons(data: any[]) {
  return saveJsonData(COUPONS_FILE, data);
}

export async function createCoupon(formData: FormData) {
  const code = formData.get('code') as string || 'EN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const type = formData.get('type') as string; // 'percentage' or 'fixed'
  const value = parseFloat(formData.get('value') as string);
  
  if (!type || isNaN(value)) {
    return { error: 'Invalid discount data' };
  }

  const coupons = await getCoupons();
  
  const newCoupon = {
    id: Date.now().toString(),
    code: code.toUpperCase(),
    type,
    value,
    used_count: 0,
    created_at: new Date().toISOString()
  };

  coupons.push(newCoupon);
  await saveCoupons(coupons);

  revalidatePath('/admin/coupons');
  return { success: true, coupon: newCoupon };
}

export async function deleteCoupon(id: string) {
  let coupons = await getCoupons();
  coupons = coupons.filter((c: any) => c.id !== id);
  await saveCoupons(coupons);

  revalidatePath('/admin/coupons');
  return { success: true };
}
