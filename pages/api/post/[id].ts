import prisma from '../../../lib/prisma'

// DELETE /api/post/:id
export default async function handle(req: any, res: any) {
  const postId = req.query.id
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    })
    res.json(post)
    if (process.env.SITE_ENVIRONMENT === 'Production') {
      fetch(process.env.DEPLOY_HOOK)
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}