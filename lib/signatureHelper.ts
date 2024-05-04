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

    const payload = timestamp + notification_type;

    const hmac = crypto.createHmac('sha256', secretKey);
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
