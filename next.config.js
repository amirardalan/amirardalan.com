module.exports = {
  reactStrictMode: true,
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