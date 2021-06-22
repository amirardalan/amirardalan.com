# [amirardalan.com](https://amirardalan.com)

A Next.js Markdown Blog and CMS written in TypeScript. Designed, built, and maintained by [@amirardalan](https://github.com/amirardalan)

### Built with:

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

## Prisma ORM:

Push new tables to db from `schema.prisma`:

```bash
yarn prisma db push --preview-feature
```

Run Prisma Studio:

```bash
yarn prisma studio
```

Open [http://localhost:5555/](http://localhost:5555/)

---

## Markdown metastrings:

### Next/Image
`![AltText {priority}{768x432}](/path-to-image.jpg)`
- Set the image dimensions and optionally set image as "priority" to utilize Next.js preloading for images above the fold.

### Code line highlight
` ```TSX {3,5-8} ... `
- Individually highlight specific lines of code by putting a space, then a JSON metastring of line numbers after the syntax language declaration. Can be individual lines or a range of contiguous lines, separated by commas.

---

## Inspiration:

### Spotify dashboard / SWR:
[Lee Robinson](https://github.com/leerob/leerob.io)




