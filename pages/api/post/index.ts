import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/post
const postHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, content, slug, teaser, author, category, featured } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      slug: slug,
      teaser: teaser,
      author: { connect: { email: author || '' } },
      category: category,
      featured: featured,
    },
  });
  res.json(result);
};

export default postHandler;
