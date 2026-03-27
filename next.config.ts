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
};

export default nextConfig;
