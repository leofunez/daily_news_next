import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-today-news.pantheonsite.io',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com'
      }
    ],
  },
};

export default nextConfig;
