import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getLikesHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const postId = req.query.id;

  if (req.method === 'GET') {
    // Get the like count
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
        select: { likes: true },
      });
      if (post) {
        res.json(post.likes);
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    // Return a 405 error for unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default getLikesHandler;
