'use server';

import { revalidatePath } from 'next/cache';
import { 
  getProducts as fetchProducts, 
  upsertProduct, 
  updateProduct as updateProductInDb,
  deleteProduct as removeProduct,
  getOrders as fetchOrders,
  updateOrderStatus as changeOrderStatus,
  deleteOrder as removeOrder,
  getCoupons as fetchCoupons,
  createCoupon as addCoupon,
  deleteCoupon as removeCoupon,
  addProductImage,
  clearProductImages,
  updateSettings,
} from '@/lib/data';
import { sendEmail } from '@/lib/email';
import { orderStatusUpdateTemplate } from '@/lib/email-templates';

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

  try {
    const newProduct = await upsertProduct({
      name, slug, sku, description, short_description: description.substring(0, 100),
      price, regular_price: price, sale_price: null,
      stock_status: stock_quantity !== 0 ? 'instock' : 'outofstock',
      stock_quantity, tags: []
    });

    if (newProduct && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await addProductImage(newProduct.id, images[i], i);
      }
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const stockVal = parseInt(formData.get('stock') as string);
    const stock_quantity = isNaN(stockVal) ? null : stockVal;

    // Collect image URLs from both possible form field names
    const imageUrlsField = formData.get('imageUrls') as string;
    const imageUrlField = formData.get('imageUrl') as string;
    const rawUrls = imageUrlsField || imageUrlField || '';
    const images = rawUrls ? rawUrls.split(',').map(s => s.trim()).filter(Boolean) : [];

    const updatedProduct = await updateProductInDb(id, {
      name,
      description: formData.get('description') as string,
      price,
      regular_price: price,
      stock_quantity,
      stock_status: stock_quantity && stock_quantity > 0 ? 'instock' : 'outofstock',
    });

    if (images.length > 0) {
      await clearProductImages(updatedProduct.id);
      for (let i = 0; i < images.length; i++) {
        await addProductImage(updatedProduct.id, images[i], i);
      }
    }

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Update product error:', error);
    return { error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await removeProduct(id);
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteOrderAction(id: string) {
  try {
    await removeOrder(id);
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const updatedOrder = await changeOrderStatus(orderId, status);

    // --- Send Status Update Email ---
    if (updatedOrder && updatedOrder.email) {
      try {
        await sendEmail({
          to: updatedOrder.email,
          subject: `Status Update for Order #${orderId} - Engraving Nation`,
          html: orderStatusUpdateTemplate(updatedOrder, status),
        });
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }
    }
    
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getCoupons() {
  return await fetchCoupons();
}

export async function createCoupon(formData: FormData) {
  const code = formData.get('code') as string || 'EN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const type = formData.get('type') as string; // 'percentage' or 'fixed'
  const value = parseFloat(formData.get('value') as string);
  
  if (!type || isNaN(value)) {
    return { error: 'Invalid discount data' };
  }

  try {
    const newCoupon = await addCoupon({
      code: code.toUpperCase(),
      type,
      value,
      used_count: 0
    });

    revalidatePath('/admin/coupons');
    return { success: true, coupon: newCoupon };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteCoupon(id: string) {
  try {
    await removeCoupon(id);
    revalidatePath('/admin/coupons');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function saveSettingsAction(settingsObj: any) {
  try {
    await updateSettings(settingsObj);
    revalidatePath('/admin/settings');
    revalidatePath('/checkout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
