import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const signatureHelper = (
  secretKey: string,
  signatureHeader: string,
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const receivedSignature = req.headers[signatureHeader];

    const { notification_type, notification_url, timestamp } = req.body;

    const payload = `${notification_type}${notification_url}${timestamp}`;

    const hmac = crypto.createHmac('sha256', secretKey);
    const signature = hmac.update(payload).digest('hex');

    if (receivedSignature !== signature) {
      res.status(401).json({ message: 'Invalid signature' });
      return;
    }

    handler(req, res);
  };
};
