import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const getTotalLikes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const totalLikes = await prisma.post.aggregate({
      _sum: {
        likes: true,
      },
    });

    res.json(totalLikes._sum.likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default getTotalLikes;
