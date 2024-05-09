/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@suekime3028/web-core"], //Next.js can automatically transpile and bundle dependencies from local packages

  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
