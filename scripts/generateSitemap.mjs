import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'


async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    '.next/server/pages/blog/**/*.json',
    'pages/**/*{.tsx,.ts}',
    '!pages/blog/',
    'pages/blog/index.tsx',
    '!pages/api',
    '!pages/_*.tsx',
    '!pages/404.tsx',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('.next/server/', '')
              .replace('pages', '')
              .replace('/index', '')
              .replace('.tsx', '')
              .replace('.json', '')
            const route = path === '/index' ? '' : path;
            return `
              <url>
                <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}${route}`}</loc>
              </url>
            `
          })
          .join('')}
    </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted)
}

generate();