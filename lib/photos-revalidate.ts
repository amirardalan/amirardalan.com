import { NextApiRequest, NextApiResponse } from 'next';

export const revalidatePhotos = (
  requestHandler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  const secret = process.env.REVALIDATE_SECRET;

  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const revalidateRes = await fetch(
        `/api/revalidate?secret=${secret}&path=/photos`
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

    requestHandler(req, res);
  };
};
