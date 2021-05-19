import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'


declare global {
  namespace NodeJS {
    interface Global {
      teaser: any;
    }
  }
}

// POST /api/post
// Required fields in body: title
// Optional fields in body: content, slug, teaser
export default async function handle(req: any, res: any) {
  const { title, slug, teaser, content } = req.body

  const session = await getSession({ req })
  const result = await prisma.post.create({
    data: {
      title: title,
      slug: slug,
      teaser: teaser,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}