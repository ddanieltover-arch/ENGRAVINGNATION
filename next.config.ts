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
        hostname: 'engravingnation.store',
      },
    ],
  },
  async redirects() {
    return [
      // Old WooCommerce category pages → new filtered product pages
      {
        source: '/product-category/chevy-emblems',
        destination: 'https://www.engravingnation.store/products?make=Chevrolet',
        permanent: true,
      },
      {
        source: '/product-category/chevy-emblems/',
        destination: 'https://www.engravingnation.store/products?make=Chevrolet',
        permanent: true,
      },
      {
        source: '/product-category/gmc-emblems',
        destination: 'https://www.engravingnation.store/products?make=GMC',
        permanent: true,
      },
      {
        source: '/product-category/gmc-emblems/',
        destination: 'https://www.engravingnation.store/products?make=GMC',
        permanent: true,
      },
      {
        source: '/product-category/ford-emblems',
        destination: 'https://www.engravingnation.store/products?make=Ford',
        permanent: true,
      },
      {
        source: '/product-category/ford-emblems/',
        destination: 'https://www.engravingnation.store/products?make=Ford',
        permanent: true,
      },
      {
        source: '/product-category/ram-emblems',
        destination: 'https://www.engravingnation.store/products?make=RAM',
        permanent: true,
      },
      {
        source: '/product-category/ram-emblems/',
        destination: 'https://www.engravingnation.store/products?make=RAM',
        permanent: true,
      },
      {
        source: '/product-category/popular-searches',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/product-category/popular-searches/',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/product-category/:slug*',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      // Old WooCommerce shop pages
      {
        source: '/shop',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/shop/',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      // Old WooCommerce individual product pages
      {
        source: '/product/:slug',
        destination: 'https://www.engravingnation.store/products',
        permanent: true,
      },
      // Old WordPress pages
      {
        source: '/my-account',
        destination: 'https://www.engravingnation.store/',
        permanent: true,
      },
      {
        source: '/my-account/',
        destination: 'https://www.engravingnation.store/',
        permanent: true,
      },
      {
        source: '/wp-admin',
        destination: 'https://www.engravingnation.store/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: 'https://www.engravingnation.store/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
