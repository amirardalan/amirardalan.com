import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '@/lib/prisma'


// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, slug, teaser, category } = req.body

  const session = await getSession({ req })
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      slug: slug,
      teaser: teaser,
      author: { connect: { email: session?.user?.email } },
      category: category
    },
  })
  res.json(result)
}