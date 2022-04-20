import fs from 'fs'
import prisma from '@/lib/prisma'

// Dynamically Generate sitemap.xml
export const getServerSideProps = async ({ res }) => {
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const staticPages = fs
  .readdirSync('./.next/server/pages')
  .filter((staticPage) => {
    return ![
      // "_app.tsx",
      // "_document.tsx",
      // "404.tsx",
      // "sitemap.xml.tsx",
    ].includes(staticPage);
  })
  .map((staticPagePath) => {
    return `${baseUrl}/${staticPagePath}`;
  });

  const feed = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, editedAt: true }
  })

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((url) => {
        return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      })
      .join("")}
    ${feed
      .map(({ slug, editedAt }) => {
        return `
            <url>
              <loc>${baseUrl}/${slug}</loc>
              <lastmod>${editedAt}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
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