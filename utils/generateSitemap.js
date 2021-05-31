const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.tsx,.ts}',
    '.next/**/*{.html,.json}',
    '!pages/_*.tsx',
    '!pages/api',
		'!pages/404.tsx',
		'!pages/blog/[slug].tsx',
		'!pages/blog/edit/[id].tsx',
		'!pages/blog/create.tsx',
		'!pages/blog/drafts.tsx',
		'!pages/blog/edit.tsx',
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('.tsx', '')
                  .replace('.ts', '')
                  .replace('.js', '')
                  .replace('.html', '')
                  .replace('/index', '')
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
  `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
