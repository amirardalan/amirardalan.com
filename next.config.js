module.exports = {
  async redirects() {
    return [
      {
        source: '/api/auth',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/bio',
        destination: '/about',
        permanent: true,
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/generateSitemap.js')
    }
    return config
  }
}