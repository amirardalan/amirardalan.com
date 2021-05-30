import prisma from '../../../lib/prisma'

// DELETE /api/post/:id
export default async function handle(req: any, res: any) {
  const postId = req.query.id
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    })
    // Deploy to Production
    await fetch(process.env.DEPLOY_HOOK)
    // Clear Preview Cookies
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/preview/exit-preview`)
    res.json(post)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}