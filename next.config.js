/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
