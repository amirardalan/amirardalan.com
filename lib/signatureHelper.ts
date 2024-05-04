import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const signatureHelper = (
  secretKey: string,
  signatureHeader: string,
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const receivedSignature = req.headers[signatureHeader];

    const { notification_type, timestamp } = req.body;

    const payload = `${notification_type}${timestamp}`;

    const hmac = crypto.createHmac('sha256', secretKey);
    const signature = hmac.update(payload).digest('hex');

    console.log('Signature Header:', signatureHeader);
    console.log('Notification Type:', notification_type);
    console.log('Timestamp:', timestamp);
    console.log('Payload:', payload);
    console.log('Signature:', signature);
    console.log('Received Signature:', receivedSignature);

    if (receivedSignature !== signature) {
      res.status(401).json({ message: 'Invalid signature' });
      return;
    }

    handler(req, res);
  };
};
