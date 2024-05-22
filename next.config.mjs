/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@suekime3028/web-core'], //Next.js can automatically transpile and bundle dependencies from local packages

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
      },
    ],
  },
};

export default nextConfig;
