import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const signatureHelper = (
  requestHandler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  const secret = process.env.CLOUDINARY_API_SECRET!;

  return async function (req: NextApiRequest, res: NextApiResponse) {
    const signature = req.headers['x-cld-signature'];
    const timestamp = req.headers['x-cld-timestamp'];
    let { notification_type } = req.body;

    const payload = `${secret}.${notification_type}.${timestamp}`;

    const hmac = crypto.createHmac('sha1', secret);
    const calculatedSignature = hmac.update(payload).digest('hex');

    console.log('Received Signature:', signature);
    console.log('Received Timestamp:', timestamp);
    console.log('Payload:', payload);
    console.log('Calculated Signature:', calculatedSignature);

    if (signature !== calculatedSignature) {
      res.status(401).json({ message: 'Invalid signature' });
      return;
    }

    requestHandler(req, res);
  };
};
