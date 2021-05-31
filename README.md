## aa21

`aa21` is a simple, yet powerful blog and CMS built with [Next.js](https://github.com/vercel/next.js/), [Prisma](https://github.com/prisma/prisma), PostgreSQL, [Emotion](https://github.com/emotion-js/emotion), and [Three.js](https://github.com/mrdoob/three.js/).

Built and maintained by [@amirardalan](https://github.com/amirardalan)

---

## Local Development: 

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Optionally, create a local copy of a production build. (useful for setting and testing `sitemapGenerator.js` configuration):

```bash
npm run build
```

## Prisma ORM

Middleware that connects Next.js to a database.

Run Prisma Studio:

```bash
npx prisma studio
```

Push new tables to db from `schema.prisma`:

```bash
npx prisma db push --preview-feature
```