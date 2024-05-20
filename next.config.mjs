/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@suekime3028/web-core'], //Next.js can automatically transpile and bundle dependencies from local packages

  experimental: {
    serverActions: {
      // allowedOrigins: ["w84v05fz-3000.asse.devtunnels.ms"],
    },
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
