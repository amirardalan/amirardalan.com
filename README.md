# amir.sh

Personal website built with my [Startup](https://github.com/amirardalan/startup) project.

### Features

- Autentication with [Auth.js](https://authjs.dev/getting-started/installation?framework=next-js)
- State management with [Zustand](https://github.com/pmndrs/zustand)
- Light, Dark, and System Theme toggle
- Prettier code formatting with [Tailwind plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- [CLSX](https://github.com/lukeed/clsx) for improved logic within `className`
- Next.js [optimized fonts](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images)
- Dynamic theme-based favicon
- Dynamic Metadata and Page Titles
- Route-based active navigation highlighting
- Dynamic footer copyright date
- Tooltip component
- [OG Image](https://vercel.com/docs/functions/og-image-generation) metadata
- Dynamically-generated [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

## Getting Started

### Setup

```bash
bun install
```

Then, set up your [GitHub oAuth App](https://authjs.dev/getting-started/providers/github?framework=next-js) and add your GitHub Client ID and Secret in a `.env.local` file:

```
// .env.local
AUTH_GITHUB_ID=<GitHub Client ID>
AUTH_GITHUB_SECRET=<GitHub Client Secret>

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<Next Auth Secret>
```

And finally, generate a Next Auth secret which will automatically overwrite the placeholder in the `.env.local` file:

```bash
npx auth secret
```

### Run

```bash
bun dev
```
