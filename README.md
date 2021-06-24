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

## Markdown Features:
- **Next/Image:** Set `width`, `height`, and optional `priority` attributes in Markdown.
- **Code Line Highlighting:** Individually highlight `code` lines and/or line ranges within Markdown.
- **Links:** Write normal Markdown and external links will automatically open in a new tab.

### Next/Image Dimensions & Priority
Utilize `Next/Image` functionality within Markdown by using custom metastrings inside the Markdown Alt.
Retain the terseness of pure Markdown while getting the benefits of the Next/Image component without having to mix in JSX.

Example: `![AltText {priority}{768x432}](/path-to-image.jpg)`
- Define image width and height: `{Width x Height}`
- Optionally set image as `{priority}` to utilize Next.js preloading for images above the fold.

### Code line highlight
Example: ` ```JSX {3,5-8} ... `
- Individually highlight specific lines of code using a space after the language declaration followed by this JSON metastring. Highlight individual lines and/or a range of contiguous lines, separated by commas.

### Links
Example: `[internal link](/blog/my-blog-post)` / `[external link](https://example.com)`
- External links will automatically render with `target="_blank" rel="noopener noreferrer"` and open in a new tab
- Internal links are handled normally

---

## Inspiration:

### Spotify dashboard / SWR:
[Lee Robinson](https://github.com/leerob/leerob.io)

### Three.js Terrain Generator:
[@Mozzius](https://github.com/Mozzius/terrain-fiber)




