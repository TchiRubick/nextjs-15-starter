import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.filestackcontent.com',
      },
      {
        hostname: 'localhost',
      },
      {
        hostname: 'bucket-production-b82f.up.railway.app',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
