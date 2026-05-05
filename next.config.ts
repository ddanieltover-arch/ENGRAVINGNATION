import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.10.5', 'localhost:3001'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ebayimg.com',
      },
      {
        protocol: 'https',
        hostname: 'engravingnation.store',
      },
    ],
  },
  async redirects() {
    return [
      // Old WooCommerce category pages → new filtered product pages
      {
        source: '/product-category/chevy-emblems',
        destination: 'https://engravingnation.store/products?make=Chevrolet',
        permanent: true,
      },
      {
        source: '/product-category/chevy-emblems/',
        destination: 'https://engravingnation.store/products?make=Chevrolet',
        permanent: true,
      },
      {
        source: '/product-category/gmc-emblems',
        destination: 'https://engravingnation.store/products?make=GMC',
        permanent: true,
      },
      {
        source: '/product-category/gmc-emblems/',
        destination: 'https://engravingnation.store/products?make=GMC',
        permanent: true,
      },
      {
        source: '/product-category/ford-emblems',
        destination: 'https://engravingnation.store/products?make=Ford',
        permanent: true,
      },
      {
        source: '/product-category/ford-emblems/',
        destination: 'https://engravingnation.store/products?make=Ford',
        permanent: true,
      },
      {
        source: '/product-category/ram-emblems',
        destination: 'https://engravingnation.store/products?make=RAM',
        permanent: true,
      },
      {
        source: '/product-category/ram-emblems/',
        destination: 'https://engravingnation.store/products?make=RAM',
        permanent: true,
      },
      {
        source: '/product-category/popular-searches',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/product-category/popular-searches/',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/product-category/:slug*',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      // Old WooCommerce shop pages
      {
        source: '/shop/:path*',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      // Old WooCommerce individual product pages
      {
        source: '/product/:slug',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      // Catch-all for any other common WP paths
      {
        source: '/tag/:slug*',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/category/:slug*',
        destination: 'https://engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/author/:slug*',
        destination: 'https://engravingnation.store/',
        permanent: true,
      },
      {
        source: '/wp-admin',
        destination: 'https://engravingnation.store/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: 'https://engravingnation.store/',
        permanent: true,
      },
      // Old individual post paths
      {
        source: '/2022/:slug*',
        destination: 'https://engravingnation.store/articles',
        permanent: true,
      },
      {
        source: '/2023/:slug*',
        destination: 'https://engravingnation.store/articles',
        permanent: true,
      },
      {
        source: '/2024/:slug*',
        destination: 'https://engravingnation.store/articles',
        permanent: true,
      },
      {
        source: '/2025/:slug*',
        destination: 'https://engravingnation.store/articles',
        permanent: true,
      },
      {
        source: '/2026/:slug*',
        destination: 'https://engravingnation.store/articles',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
