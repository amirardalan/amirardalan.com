import { NextApiRequest, NextApiResponse } from 'next';

// pages/api/post/revalidate.ts
export default async function triggerRevalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postPath = req.query.path;
  const revalidateHome = req.query.revalidateHome;
  const secret = process.env.REVALIDATE_SECRET;

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${secret}&path=${postPath}`
    );
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${secret}&path=/blog`
    );

    if (revalidateHome) {
      await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${secret}&path=/`
      );
    }

    res.status(200).json({ message: 'Successfully triggered revalidation' });
  } catch (error) {
    console.error('Failed to revalidate:', error);
    res.status(500).json({ message: 'Failed to trigger revalidation' });
  }
}
