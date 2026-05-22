import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/google-feed',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/cart',
          '/checkout',
          '/payment',
        ],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Googlebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://engravingnation.store/sitemap.xml',
  };
}
