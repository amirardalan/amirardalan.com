import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { rateLimit } from '@/api/middleware';

interface UpdatePostInput {
  title?: string;
  content?: string;
  published?: boolean;
  likes?: {
    increment?: number;
    decrement?: number;
  };
}

const updatePostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id;

  if (req.method === 'PUT') {
    // Add a like
    try {
      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: { likes: { increment: 1 } } as UpdatePostInput,
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'DELETE') {
    // Remove a like
    try {
      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: { likes: { decrement: 1 } } as UpdatePostInput,
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    // Return a 405 error for unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default rateLimit(updatePostHandler, 10, 60000);
