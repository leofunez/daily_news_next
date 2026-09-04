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
    domains: ['dev-today-news.pantheonsite.io', 'secure.gravatar.com'],
  },
};

export default nextConfig;
