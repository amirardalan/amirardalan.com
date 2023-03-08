import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

// POST /api/update
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    id,
    title,
    content,
    slug,
    teaser,
    category,
    featured,
    editFeatured,
    showEdited,
  } = req.body;

  if (!featured && !editFeatured) {
    const result = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        slug: slug,
        teaser: teaser,
        category: category,
        featured: featured,
        showEdited: showEdited,
      },
    });
    res.json(result);
  } else {
    const result = await prisma.$transaction([
      prisma.post.updateMany({
        where: { featured: true },
        data: { featured: false },
      }),
      prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          content: content,
          slug: slug,
          teaser: teaser,
          category: category,
          featured: featured,
          showEdited: showEdited,
        },
      }),
    ]);
    res.json(result);
  }
}
