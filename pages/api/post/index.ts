import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'


// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, slug, teaser, category, featured } = req.body
  
  const session = await getSession({ req })

  if (req.body.featured) {
    const result = await prisma.$transaction([
      prisma.post.updateMany({
        where: { featured: true },
        data: { featured: false }
      }),
      prisma.post.create({
        data: {
          title: title,
          content: content,
          slug: slug,
          teaser: teaser,
          author: { connect: { email: session?.user?.email } },
          category: category,
          featured: featured
        },
      })
    ])
    res.json(result)
  }
  else {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        slug: slug,
        teaser: teaser,
        author: { connect: { email: session?.user?.email } },
        category: category,
        featured: featured
      },
    })
    res.json(result)
  }

}