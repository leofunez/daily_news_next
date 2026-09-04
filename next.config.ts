import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev-today-news.pantheonsite.io/wp-json/wp/v2/:path*',
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['dev-today-news.pantheonsite.io', 'secure.gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-today-news.pantheonsite.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
