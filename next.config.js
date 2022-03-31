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
      'i.scdn.co', // Spotify
    ]
  },
}