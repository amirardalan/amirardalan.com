import { NextApiRequest, NextApiResponse } from 'next';
import { signatureHelper } from '@/lib/cloudinary-signature';

const photosHandler = signatureHelper(
  async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Received a request:', req.method, req.url);
    console.log('Request body:', req.body);

    if (req.method === 'POST') {
      const { notification_type } = req.body;

      if (notification_type === 'upload' || notification_type === 'delete') {
        // Revalidate the Photos page from the server
        res.status(200).json({ message: 'Revalidation triggered' });
      } else {
        res.status(400).json({
          message: `Unsupported notification type: ${notification_type}`,
        });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
);

export default photosHandler;
