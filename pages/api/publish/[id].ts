import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id
  const isPublished = (req.query.published === 'true') ? false : true

  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: Boolean(isPublished) },
  })
  res.json(post)
}
