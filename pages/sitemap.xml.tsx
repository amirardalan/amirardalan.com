import fs from "fs"
import prisma from '@/lib/prisma'

export const getServerSideProps = async ({ res }) => {
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.tsx",
        "_document.tsx",
        "api",
        "404.tsx",
        "sitemap.xml.tsx",
      ].includes(staticPage)
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath.replace('.tsx','')}`
    })

  const feed = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, editedAt: true }
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((slug) => {
        return `
          <url>
            <loc>${slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `
      })
      .join("")}
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