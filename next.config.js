const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

module.exports = {
  images: {
    loader:
    "imgix",
    path: ""
  }
}, withTM()