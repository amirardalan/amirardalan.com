import { NextApiRequest, NextApiResponse } from 'next';

const revalidatePhotos = (
  requestHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const baseUrl =
        process.env.VERCEL_REGION === null
          ? process.env.NEXT_PUBLIC_SITE_URL
          : `https://${process.env.VERCEL_URL}`;

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

export default revalidatePhotos;
