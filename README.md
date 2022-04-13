# [amirardalan.com](https://amirardalan.com)

A Next.js Markdown Blog and CMS written in TypeScript. Designed, built, and maintained by [@amirardalan](https://github.com/amirardalan)

### Primarily Built with:

[Next.js](https://github.com/vercel/next.js/)  
[Next Auth](https://next-auth.js.org/)  
[react-markdown](https://github.com/remarkjs/react-markdown)  
[Prisma](https://github.com/prisma/prisma)  
[SWR](https://github.com/vercel/swr)  
[Emotion](https://github.com/emotion-js/emotion)

---

## Setup:

### Manifest.json
Update `public/manifest.json`. Fill out information relevant to your web app. _Note:_ The latest version of iOS Safari uses `theme_color` from this file as the background color for the notch area of iPhones and the area behind the background when the site is scrolled past the bottom with iOS's elastic scroll effect.

---

### Environment Variables

Create an `.env` file for local environment variables.

_Keep this file private, ensure `.env` remains in `.gitignore`, don't commit to a public repository. You will need to set up different [environment varibles](https://vercel.com/docs/concepts/projects/environment-variables) for Development and Production instances. Omit wrapping quotes for all variable values._

```
//.env

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_USER_EMAIL=you@email.com

DATABASE_URL=postgresql://xxxxx

NEXT_AUTH_SECRET=
GITHUB_SECRET=
GITHUB_ID=

NEXT_PUBLIC_REVALIDATE_SECRET=
NEXT_PUBLIC_OG_IMAGE_URL=https://ogimage.yourSite.vercel.app
NEXT_PUBLIC_TIMEZONE=America/Los_Angeles

SPOTIFY_CLIENT_SECRET=
SPOTIFY_CLIENT_ID=
SPOTIFY_REFRESH_TOKEN=
```

`NEXT_PUBLIC_SITE_URL`
Leave as `http://localhost:3000` for Development, set as `https://yourDomainName.com` for Production  

`NEXT_PUBLIC_USER_EMAIL`
Your email address, used for authentication and optionally your about or contact page.  

`DATABASE_URL`
The URL for your PostgreSQL database  

`NEXT_AUTH_SECRET`
[Generate a secret](https://next-auth.js.org/configuration/options#nextauth_secret) for Next Auth  

`GITHUB_SECRET`
For GitHub oAuth with Next Auth, see [GitHub Developer App Docs](https://docs.github.com/en/developers/apps/getting-started-with-apps/setting-up-your-development-environment-to-create-a-github-app)

`GITHUB_ID`
Your GitHub developer app ID, [GitHub Developer App Docs](https://docs.github.com/en/developers/apps/getting-started-with-apps/setting-up-your-development-environment-to-create-a-github-app)  

`NEXT_PUBLIC_REVALIDATE_SECRET`
Generate a secret for use with Next [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) and [On-Demand Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta)  

`NEXT_PUBLIC_OG_IMAGE_URL`
Create an [OG Image Service](https://github.com/vercel/og-image) and set this to the URL of your service app. [Further reading](#dynamically-generate-blog-og-images)  

`NEXT_PUBLIC_TIMEZONE`: Example: `America/Los_Angeles`. Set this to your local timezone for your blog posts to display the correct date and time. [Full List of IANA Timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)   

`SPOTIFY_CLIENT_SECRET`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_REFRESH_TOKEN`
See [Spotify API guide](https://developer.spotify.com/documentation/web-api/quick-start/)  

Add additional local environment variables as needed. You can set up test tokens, deploy hooks, etc. locally and create seprate versions of this file with staging and/or production values (usually stored on your server).

---

### Install Dependencies
```bash
yarn
```

### Start the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Generate a Test Build
Create a local copy of a production build (useful for testing `generateSitemap.mjs` configuration):

```bash
yarn build
```
---

## Prisma ORM:

[Prisma](https://www.prisma.io/) is a middleware that connects your Next.js application to an external database. Prisma has [powerful queries](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries) that make accessing and passing data to props simple.

The existing schema is configured for PostgreSQL. Update accordingly.  
Update schema and push new tables to db from `schema.prisma`:

```bash
yarn prisma db push
```

Run Prisma Studio:

```bash
yarn prisma studio
```

Open [http://localhost:5555/](http://localhost:5555/)

---

## Markdown Features:

- [Next/Image Component](#nextimage-component)
- [Code Line Highlighting](#code-line-highlighting)
- [Links Behavior](#links-behavior)
- [iFrame Embeds](#iframe-embeds)

### Next/Image Component
Utilize `Next/Image` functionality within Markdown by using custom metastrings inside the Markdown Alt.
Retain the terseness of pure Markdown while getting the benefits of the Next/Image component without having to mix in JSX.

```
![AltText {priority}{768x432}](/path-to-image.jpg)
```

- Define image width and height: `{Width x Height}`
- Optionally set image as `{priority}` to utilize Next.js preloading for images above the fold.

### Code Line Highlighting
` ```JSX {3,5-8} ... `
- Individually highlight specific lines of code using a space after the language declaration followed by this JSON metastring. Highlight individual lines and/or a range of contiguous lines, separated by commas.

### Links Behavior
```
[internal link](/blog/my-blog-post)
[external link](https://example.com)
```
- External links will automatically render with `target="_blank" rel="noopener noreferrer"` and open in a new tab
- Internal links are handled normally

### iFrame Embed Support
- Out of the box configuration of iframe embeds within markdown.
- Uses [Rehype Raw](https://github.com/rehypejs/rehype-raw). Disable if using this code in a way where you may not be able to trust the markdown.

---

## Dynamically Generate Blog OG Images

Out of the box, [Open Graph Images](https://ogp.me/) are automatically assigned from the first image in a blog post.

For any blog posts that do not contain an image, [this service](https://github.com/vercel/og-image) will dynamically generate one for you.

1. Fork the repo and follow the README.md and CONTRIBUTING.md.
2. Update with logos, fonts, and css that suits your blog.
3. Deploy to vercel and set a domain name, set this to the `NEXT_PUBLIC_OG_IMAGE_URL` environment variable

---

## Testing

- [Jest](jestjs.io/) is configured in `jest.config.ts` and included in the `package.json` build script.
- [React Testing Library](https://github.com/testing-library/react-testing-library) is included in `jest.setup.ts`.
- Verbose test suites will be run and logged at build time.

Run Jest manually:

```
yarn test
```

---

## Inspiration:

### Spotify dashboard / SWR:
[Lee Robinson](https://github.com/leerob/leerob.io)

### Three.js Terrain Generator:
[@Mozzius](https://github.com/Mozzius/terrain-fiber)




