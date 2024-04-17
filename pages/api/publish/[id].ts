import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/publish/:id
const publishHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const postId = req.query.id;
  const isFeatured = req.query.featured === 'true' ? true : false;
  const isPublished = req.query.published === 'true' ? false : true;

  if (isFeatured) {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: Boolean(isPublished), featured: Boolean(isFeatured) },
    });
    res.json(post);
  } else {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: Boolean(isPublished) },
    });
    res.json(post);
  }
};

export default publishHandler;
