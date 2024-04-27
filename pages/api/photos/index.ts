import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinaryConfig';

const photosHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const options = {
        type: 'upload',
        prefix: 'photos/',
        max_results: 500,
        context: true,
      };
      const result = await cloudinary.api.resources(options);

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to browse images' });
    }
  } else if (req.method === 'POST') {
    res.status(200).json({ message: 'Webhook received' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default photosHandler;