## [amirardalan.com](https://amirardalan.com)

Amir Ardalan's personal Blog and CMS written in TypeScript and powered by [Next.js](https://github.com/vercel/next.js/), [react-markdown](https://github.com/remarkjs/react-markdown), [Prisma](https://github.com/prisma/prisma), [Emotion](https://github.com/emotion-js/emotion), and [Three.js](https://github.com/mrdoob/three.js/).

Designed, Built, and maintained by [@amirardalan](https://github.com/amirardalan)

---

## Local Development: 

Run the development server:

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000)

Optionally, create a local copy of a production build. (useful for setting and testing `sitemapGenerator.js` configuration):

```bash
yarn run build
```

## Prisma ORM

Middleware that connects Next.js to a database.

Run Prisma Studio:

```bash
yarn prisma studio
```

Push new tables to db from `schema.prisma`:

```bash
yarn prisma db push --preview-feature
```