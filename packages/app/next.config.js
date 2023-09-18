/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
