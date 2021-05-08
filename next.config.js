const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

module.exports = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
  images: {
    loader:
    "imgix",
    path: ""
  }
}, withTM()