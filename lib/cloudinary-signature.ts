import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const signatureHelper = (
  requestHandler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  const cloudinarySecretKey = process.env.CLOUDINARY_API_SECRET!;
  const headerSignature = 'x-cld-signature';
  const headerTimestamp = 'x-cld-timestamp';

  return async function (req: NextApiRequest, res: NextApiResponse) {
    const signature = req.headers[headerSignature];
    const timestamp = req.headers[headerTimestamp];
    let { notification_type } = req.body;

    const payload = `notification_type=${notification_type}&timestamp=${timestamp}`;

    const hmac = crypto.createHmac('sha1', cloudinarySecretKey);
    const calculatedSignature = hmac.update(payload).digest('hex');

    console.log('Signature Header:', headerSignature);
    console.log('Timestamp Header:', headerTimestamp);
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
