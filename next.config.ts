module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/api/auth',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
  images: {
    domains: [
      'res.cloudinary.com', // Cloudinary
      'i.scdn.co', // Spotify
    ]
  },
}

export {}