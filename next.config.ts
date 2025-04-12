import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        // Account Avatars
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        // CMS Media Gallery
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      {
        source: '/admin/blog',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
