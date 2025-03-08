import { NextConfig } from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    // Add MDX options here
  },
})(nextConfig);
