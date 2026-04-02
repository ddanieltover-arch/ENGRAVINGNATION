import { MetadataRoute } from 'next';
import { getProducts, getArticles } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://engravingnation.store';

  // Fetch all data for dynamic URLs
  let products: any[] = [];
  let articles: any[] = [];
  try {
    [products, articles] = await Promise.all([
      getProducts(),
      getArticles()
    ]);
  } catch (error) {
    console.error('Error fetching data for sitemap:', error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.published_at || article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    '',
    '/gallery',
    '/products',
    '/articles',
    '/services',
    '/about',
    '/contact',
    '/shipping',
    '/refund-and-returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/gallery' || route === '/articles' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : (route === '/gallery' || route === '/articles' ? 0.8 : 0.6),
  }));

  return [...staticPages, ...productUrls, ...articleUrls];
}
