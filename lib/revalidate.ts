import { NextApiRequest, NextApiResponse } from 'next';

export const revalidatePhotos = (
  requestHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const baseUrl =
        process.env.VERCEL_ENV === 'preview'
          ? process.env.VERCEL_URL
          : process.env.NEXT_PUBLIC_SITE_URL;

      const revalidateRes = await fetch(
        `${baseUrl}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/photos`
      );

      if (!revalidateRes.ok) {
        console.error('Failed to revalidate /photos');
        res.status(500).json({ message: 'Failed to revalidate /photos' });
        return;
      }
    } catch (err) {
      console.error('Error when trying to revalidate /photos:', err);
      res
        .status(500)
        .json({ message: 'Error when trying to revalidate /photos' });
      return;
    }

    await requestHandler(req, res);

    res.status(200).json({ message: 'Successfully revalidated /photos' });
  };
};

export const revalidateBlog = async (
  postPath: string,
  revalidateHome: boolean
): Promise<void> => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/revalidate?path=${postPath}&revalidateHome=${revalidateHome}`
    );
  } catch (error) {
    console.error('Failed to revalidate:', error);
  }
};
