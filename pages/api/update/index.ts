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

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  const postHistoryCount = await prisma.postHistory.count({
    where: { postId: post.id },
  });

  if (postHistoryCount >= 10) {
    const oldestPostHistory = await prisma.postHistory.findFirst({
      where: { postId: post.id },
      orderBy: { editedAt: 'asc' },
    });

    await prisma.postHistory.deleteMany({
      where: { id: oldestPostHistory.id },
    });
  }

  await prisma.postHistory.create({
    data: {
      editedAt: post.editedAt,
      postId: post.id,
    },
  });

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
