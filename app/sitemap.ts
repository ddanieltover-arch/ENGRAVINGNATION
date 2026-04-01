import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://engravingnation.store';

  // Fetch all products to create dynamic URLs
  let products: any[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/gallery',
    '/products',
    '/services',
    '/about',
    '/contact',
    '/shipping',
    '/refund-and-returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/gallery' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : (route === '/gallery' ? 0.8 : 0.6),
  }));

  return [...staticPages, ...productUrls];
}
