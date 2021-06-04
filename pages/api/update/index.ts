import prisma from '@/lib/prisma'


// POST /api/update
// Required fields in body: title
// Optional fields in body: content, slug, teaser
export default async function handle(req: any, res: any) {
  const { id, title, content, slug, teaser } = req.body

  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      slug: slug,
      teaser: teaser,
    },
  })
  res.json(result)
}