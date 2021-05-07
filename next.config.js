const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])


module.exports = withTM(),
{
  images: {
    loader: "imgix",
    path: "",
  }
}