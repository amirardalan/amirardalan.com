import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const signatureHelper = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  const secretKey = process.env.CLOUDINARY_API_SECRET || '';
  const signatureHeader = 'x-cld-signature';

  return async function (req: NextApiRequest, res: NextApiResponse) {
    const receivedSignature = req.headers[signatureHeader];
    let { notification_type, timestamp } = req.body;

    timestamp = Math.floor(new Date(timestamp).getTime() / 1000);

    const payload = `notification_type=${notification_type}&timestamp=${timestamp}`;

    const hmac = crypto.createHmac('sha1', secretKey);
    const signature = hmac.update(payload).digest('hex');

    console.log('Signature Header:', signatureHeader);
    console.log('Payload:', payload);
    console.log('Calculated Signature:', signature);
    console.log('Received Signature:', receivedSignature);

    if (receivedSignature !== signature) {
      res.status(401).json({ message: 'Invalid signature' });
      return;
    }

    handler(req, res);
  };
};
