# [amirardalan.com](https://amirardalan.com)

A Next.js Markdown Blog and CMS written in TypeScript. Designed, built, and maintained by [@amirardalan](https://github.com/amirardalan)

## Built with

[Next.js](https://github.com/vercel/next.js/)  
[react-markdown](https://github.com/remarkjs/react-markdown)  
[Prisma](https://github.com/prisma/prisma)  
[Emotion](https://github.com/emotion-js/emotion)  
[Three.js](https://github.com/mrdoob/three.js/)  

---

## Local Development: 

Set local environment variables in `.env` file.

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

Optionally, create a local copy of a production build. (useful for setting and testing `sitemapGenerator.js` configuration):

```bash
yarn build
```

## Prisma ORM

Push new tables to db from `schema.prisma`:

```bash
yarn prisma db push --preview-feature
```

Run Prisma Studio:

```bash
yarn prisma studio
```

Open [http://localhost:5555/](http://localhost:5555/)