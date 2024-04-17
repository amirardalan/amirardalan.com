import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getTotalLikes: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const totalLikes = await prisma.post.aggregate({
      where: {
        published: true,
      },
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
