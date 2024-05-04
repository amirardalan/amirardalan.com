import { NextApiRequest, NextApiResponse } from 'next';
import revalidateChanges from '@/lib/revalidate';
import { signatureHelper } from '@/lib/signatureHelper';

export const config = {
  api: {
    bodyParser: true,
  },
};

const secretKey = process.env.CLOUDINARY_API_SECRET || '';
const signatureHeader = 'x-cloudinary-signature';

const photosHandler = signatureHelper(
  secretKey,
  signatureHeader,
  async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Received a request:', req.method, req.url);
    console.log('Request body:', req.body);

    if (req.method === 'POST') {
      const { notification_type } = req.body;

      if (notification_type === 'upload' || notification_type === 'delete') {
        revalidateChanges('photos');
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
