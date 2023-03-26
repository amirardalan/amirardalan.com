import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

// POST /api/post
const postHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, content, slug, teaser, category, featured } = req.body;
  const session = await getSession({ req });

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      slug: slug,
      teaser: teaser,
      author: { connect: { email: session?.user?.email || '' } },
      category: category,
      featured: featured,
    },
  });
  res.json(result);
};

export default postHandler;
