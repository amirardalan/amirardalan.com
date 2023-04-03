import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface UpdatePostRequestBody {
  id: number;
  title: string;
  content: string;
  slug: string;
  teaser: string;
  category: string;
  featured: boolean;
  editFeatured: boolean;
  showEdited: boolean;
}

// POST /api/update
const updateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
  }: UpdatePostRequestBody = req.body;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    res.status(404).json({ message: `Post with ID ${id} not found` });
    return;
  }

  const postHistoryCount = await prisma.postHistory.count({
    where: { postId: post.id },
  });

  if (postHistoryCount >= 2) {
    const oldestPostHistory = await prisma.postHistory.findFirst({
      where: { postId: post.id },
      orderBy: { editedAt: 'asc' },
    });

    if (oldestPostHistory) {
      await prisma.postHistory.delete({
        where: { id: oldestPostHistory.id },
      });
    }
  }

  if (showEdited) {
    await prisma.postHistory.create({
      data: {
        editedAt: post.editedAt,
        postId: post.id,
      },
    });
  }

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
};

export default updateHandler;
