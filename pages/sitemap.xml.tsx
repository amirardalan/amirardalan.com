import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Dynamically Generate sitemap.xml
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const feed = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, editedAt: true },
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <priority>1.0</priority>
  </url>
    <url>
    <loc>${baseUrl}/photos</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/uses</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/resume</loc>
    <priority>1.0</priority>
  </url>
    ${feed
      .map(({ slug, editedAt }) => {
        return `
            <url>
              <loc>${baseUrl}/blog/${slug}</loc>
              <lastmod>${editedAt}</lastmod>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join('')}
  </urlset>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

const Sitemap = () => {};
export default Sitemap;
