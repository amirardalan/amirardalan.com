# [amirardalan.com](https://amirardalan.com)

A Next.js Markdown Blog and CMS written in TypeScript. Designed, built, and maintained by [@amirardalan](https://github.com/amirardalan)

### Primarily Built with:

[Next.js](https://github.com/vercel/next.js/)  
[Next Auth](https://next-auth.js.org/)  
[react-markdown](https://github.com/remarkjs/react-markdown)  
[Prisma](https://github.com/prisma/prisma)  
[SWR](https://github.com/vercel/swr)  
[Emotion](https://github.com/emotion-js/emotion)

### Who is this for?

This is my personal portfolio and blog. You may find the CMS portion and some of the custom Markdown functionality useful. This application currently runs on Next13 using the Page directory paradigm. I plan to upgrade this project to the app directory to take advantage of full React 18 support in the near future.

### CMS Features

- Manage blog posts from an authenticated Admin Panel
- Write blog posts with [extensible Markdown](#markdown-features)
- Publish changes on per-page basis, no need to rebuild the entire application
- Create and manage unpublished Drafts
- Publish, unpublish, and delete Posts/Drafts
- Set/Edit Title, Teaser, Slug, Content, and Category
- Set a featured post. If no post is featured, use the latest post as a fallback.
- Optionally suppress "Updated" date when editing
- Upload files from your device directly to Cloudinary and a markdown URL is auto inserted into the blog post content.

---

## Setup:

### Manifest.json

Update `public/manifest.json`. Fill out information relevant to your web app.  
Note: I've ommited `theme_color` to allow Safari to match the background and notch area according to the app background color, which works great for light and dark mode. Hopefully w3c will [officially add a way](https://github.com/w3c/manifest/issues/1045) to control this ourselves in the future.

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
NEXT_PUBLIC_TIMEZONE=America/Los_Angeles

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
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
Generate a secret for use with Next [On-Demand Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta)

`NEXT_PUBLIC_TIMEZONE`: Example: `America/Los_Angeles`. Set this to your local timezone for your blog posts to display the correct date and time. [Full List of IANA Timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)

`CLOUDINARY_NAME`: Your Cloudinary Media Library name (cloud-name)

`CLOUDINARY_API_KEY`: See Cloudinary's [Admin API reference](https://cloudinary.com/documentation/admin_api)

`CLOUDINARY_API_SECRET`: See Cloudinary's [Admin API reference](https://cloudinary.com/documentation/admin_api)

---

### Install Dependencies

```bash
npm install
```

### Configure Prettier

If you'd like to contribute to this project or use Prettier with your fork, download the [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#review-details).

1. After installing the extension, open the extensions panel in VSCode, find Prettier - Code Formatter, click on the gear icon, and select `Extension Settings`.
2. Inside of the Prettier Extension Settings, locate `Prettier: Config Path` and ensure it is set to `.prettierrc.json`.

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Generate and Run a Static Test Build

Create a local copy of a production build (useful for testing [on-demand ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta), `pages/sitemap.xml.tsx` configuration), and [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) performance:

```bash
npm run test
```

---

## Prisma ORM:

[Prisma](https://www.prisma.io/) is a middleware that connects your Next.js application to an external database. Prisma has [powerful queries](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries) that make accessing and passing data to props simple.

The existing schema is configured for PostgreSQL. Update accordingly.  
Update schema and push new tables to db from `schema.prisma`:

```bash
npx prisma db push
```

Run Prisma Studio:

```bash
npx prisma studio
```

Open [http://localhost:5555/](http://localhost:5555/)

---

## Markdown Features:

- [Next/Image Component](#nextimage-component)
- [Code Line Highlighting](#code-line-highlighting)
- [Heading Anchors](#heading-anchors)
- [Link Behavior](#link-behavior)
- [iFrame Embeds](#iframe-embeds)

### Next/Image Component

Utilize `Next/Image` functionality within Markdown by using custom metastrings inside the Markdown Alt.
Retain the terseness of pure Markdown while getting the benefits of the Next/Image component without having to mix in JSX.

```
![AltText {caption: Photo credit: Some Person}{priority}{768x432}](/path-to-image.jpg)
```

- Define image width and height: `{Width x Height}`
- Optionally set image as `{priority}` to utilize Next.js preloading for images above the fold.
- Add an optional caption that displays beneath the image.

### Code Line Highlighting

` ```JSX {3,5-8} ... `

- Individually highlight specific lines of code using a space after the language declaration followed by this JSON metastring. Highlight individual lines and/or a range of contiguous lines, separated by commas.

### Heading Anchors

- H3 headings in a blog post automatically generate an anchor link from a generated slug based on the heading contents. Seamlessly handles `code` inside headings.

### Link Behavior

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

This project uses [Vercel OG](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) Image Service to dynamically generate images for blog posts.

- Ensure `NEXT_PUBLIC_META_NAME` and `NEXT_PUBLIC_META_DESCRIPTION` are set in your `.env.local` file.
- You will also need to declare a valid image path for the background of your og thumbnail in `data/metadata.ts` (image should be 1200x627).

---

## Additional Notes

- Most static content can be edited in `data/content.ts`
- Currently blog categories are manually set in `data/categories.ts`
- For blog image hosting, I recommend Cloudinary's Free [Digital Asset Manager](https://cloudinary.com/documentation/digital_asset_management_overview)
- This project is the culmination of thousands of hours of work. It's primarily open-source for educational purposes. If you intend to use parts of the code, please create your own design and content!
- If you have any questions, reach out to me on [Twitter](https://twitter.com/amirardalan)!

---

## Inspiration:

[Lee Robinson](https://github.com/leerob/leerob.io)

[@Mozzius](https://github.com/Mozzius/terrain-fiber)
