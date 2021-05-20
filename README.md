## Amir Ardalan Portfolio

`aa21` is a personal portfolio & blog is made and maintained by @amirardalan using [Next.js](https://github.com/vercel/next.js/), [Emotion](https://github.com/emotion-js/emotion), [Three.js](https://github.com/mrdoob/three.js/) and [Prisma](https://github.com/prisma/prisma).

See `package.json` for full list of dependencies.

## Local Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Prisma ORM

Run Prisma Studio:

```bash
npx prisma studio
```

Push new tables to db from `schema.prisma`:

```bash
npx prisma db push --preview-feature
```