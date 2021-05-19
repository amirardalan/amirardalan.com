import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'


// POST /api/post
// Required fields in body: title
// Optional fields in body: content, slug, teaser
export default async function handle(req: any, res: any) {
  const { title, content, slug, teaser } = req.body

  const session = await getSession({ req })
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      slug: slug,
      // teaser: teaser,
      author: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}