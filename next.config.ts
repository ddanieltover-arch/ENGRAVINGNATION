import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.10.5', 'localhost:3001'],
  images: {
    unoptimized: true, // Disable optimization to avoid 404s from upstream providers in some environments
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
    ];
  },
};

export default nextConfig;
