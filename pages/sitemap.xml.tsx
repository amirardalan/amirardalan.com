import { globby } from 'globby'
import prisma from '@/lib/prisma'

// Dynamically Generate sitemap.xml
export const getServerSideProps = async ({ res }) => {
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const staticPages = await globby([
    '.next/server/pages/blog/**/*.json',
    '!.next/server/pages/**/*.js.nft.json',
    '!pages/blog/',
    'pages/blog/index.tsx',
    '!pages/api',
    '!pages/_*.tsx',
    '!pages/404.tsx',
    '!pages/sitemap.xml.tsx',
    'pages/**/*{.tsx,.ts}'
  ])

  const feed = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, editedAt: true }
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((staticPage) => {
        const path = staticPage
          .replace('.next/server/', '')
          .replace('pages', '')
          .replace('/index', '')
          .replace('.tsx', '')
          .replace('.json', '')
        const slug = path === '/index' ? '' : path
        return `
          <url>
            <loc>${`${baseUrl}${slug}`}</loc>
          </url>
        `
      })
      .join('')}
      ${feed
        .map(({ slug, editedAt }) => {
          return `
              <url>
                <loc>${baseUrl}/documents/${slug}</loc>
                <lastmod>${editedAt}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `
          })
        .join("")}
    </urlset>
  `

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return { props: {} }
}

const Sitemap = () => {}
export default Sitemap