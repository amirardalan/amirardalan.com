# amir.sh

Amir Ardalan's personal website built with [Startup](https://github.com/amirardalan/startup). This is a Markdown Blog and CMS written in TypeScript. Publish and edit blog posts in Next.js App Router using Supabase, Drizzle, MDX, and On-demand Revalidation.

### Features

- Autentication with [Auth.js](https://authjs.dev/getting-started/installation?framework=next-js)
- Postgres database with [Supabase](https://supabase.com/docs/guides/database/overview)
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
- Custom [Cloudinary](https://cloudinary.com/) CMS Media Gallery

## Getting Started

### Setup

```bash
bun install
```

Then, set up your [GitHub oAuth App](https://authjs.dev/getting-started/providers/github?framework=next-js) and add your GitHub Client ID and Secret in a `.env.local` file:

```
// .env.local
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_TIMEZONE=America/Los_Angeles

AUTH_SECRET=<Next Auth Secret>
AUTH_TRUST_HOST=NEXT_PUBLIC_URL
AUTH_GITHUB_ID=<GitHub Client ID>
AUTH_GITHUB_SECRET=<GitHub Client Secret>
ALLOWED_EMAILS=you@example.com,team@example.com
ALLOWED_EMAIL_DOMAINS=example.com,test.com

DB_URL=<Supabase Transaction Pooler URL>
DB_API_KEY=<Supabase API Key>
KV_REST_API_TOKEN=<Upstash KV API Token>
KV_REST_API_URL=<Upstash KV REST API URL>
ENABLE_DEV_CACHE=true //cache redis for dev

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud Name>
CLOUDINARY_URL=<Cloudinary URL>
CLOUDINARY_API_KEY=<Cloudinary API Key>
CLOUDINARY_API_SECRET=<Cloudinary API Secret>

NEXT_PUBLIC_POSTHOG_KEY=<Your PostHog Key>
NEXT_PUBLIC_POSTHOG_HOST=<Your PostHog Host>
```

And finally, generate a Next Auth secret which will automatically overwrite the placeholder in the `.env.local` file:

```bash
npx auth secret
```

### Database

```bash
npx drizzle-kit push
```

> [!NOTE]
> This command will create the database tables and columns based on the schema defined in `./src/db/schema.ts` file.

### Run

```bash
bun dev
```

### Preview

To test On-demand Revalidation of blog posts and to ensure the app is in good shape to run on production it is recommended to compile a preview build.

```bash
bun preview
```

> [!NOTE]
> This script will format the project using Prettier, check linting, and then compile a preview build.

### Drizzle Studio

To interact with the postgres database locally:

```bash
npx drizzle-kit studio
```

> [!NOTE]
> If using Brave browser you must turn Brave Shield off for `https://local.drizzle.studio/`

### Markdown Features

#### Images

Blog posts are written in Markdown. Markdown images will utilize the Next Image component for optimized loading. The markdown image can be passed a priority prop:

```markdown
![Alt text](https://example.com/image.png 'priority')
```

Or you can use an image wrapped in a custom MDX `<Figure>` component to add a caption (this also works with an optional priority prop for images above the fold):

```markdown
<Figure src="your-image-src.png" alt="Your Image Alt" caption="Your Image Caption" priority />
```

#### Code

Highlight individual lines or blocks of code (line 2 and lines 3-5):

````
```typescript{2,3-5}
````
