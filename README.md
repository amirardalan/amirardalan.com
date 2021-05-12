`aa21` is a simple portfolio  site built with [Next.js](https://nextjs.org/).

## Project Dependencies

- [emotion](https://github.com/emotion-js/emotion) - CSS in JS / Theming
- [fontsource](https://github.com/fontsource/fontsource) - Self hosted web fonts
- [three.js](https://github.com/mrdoob/three.js/) - JavaScript 3D library
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber) - WebGL 3D Canvas Rendering
- [drei](https://github.com/pmndrs/drei) - Helpers & Abstractions for `react-three-fiber`
- [@react-spring/three](https://github.com/pmndrs/react-spring/tree/9.0.0/targets/three) - Physics based animation library for `react-three-fiber`
- [bezier-easing](https://github.com/gre/bezier-easing) - Cubic Bezier Curve easing
- [react-typical](https://github.com/catalinmiron/react-typical) - React animated typing


## Local Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Set `npm run export` as the Build Command on server to generate static files for production.
`Package.json` contains `"export": "npm run build && next export -o _static"`

## Custom Configuration

There are two custom configurations in `next.config.js` required to avoid errors:

The first issue is a build error when using `npm run export` to generate static files for production. The build fails if code utilizes the build-in Next.js Image components from 'next/image'.

- The current workaround is adding the following to `next.config.js`:

```javascript
module.exports = {
  images: {
    loader:
    "imgix",
    path: ""
  }
}
```

The second issue is a compilation error when working with Three.js experimental postprocessing effects. According to the the `react-three-fiber` [official documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/installation) on Next.js compatibility, the following workaround is required to properly transpile:

- [next-transpile-modules](https://github.com/martpie/next-transpile-modules) - Transpile modules from `node_modules` for `three` postprocessing effects

- ☝️ This needs to be added to `next.config.js`, example:

```javascript
const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

module.exports = withTM()
```
With both workarounds combined, the final `next.config.js` file should look something like this:

```javascript
const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

module.exports = {
  images: {
    loader:
    "imgix",
    path: ""
  }
}, withTM()
```

🎉 That's it!