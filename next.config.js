/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api/auth',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/resume',
        destination: process.env.RESUME_URL,
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
