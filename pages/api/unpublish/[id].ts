import prisma from '../../../lib/prisma'

// PUT /api/unpublish/:id
export default async function handle(req, res) {
  const postId = req.query.id
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: false},
  })
  res.json(post)
}
