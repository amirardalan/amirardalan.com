import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const signatureHelper = (
  requestHandler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  const secret = process.env.CLOUDINARY_API_SECRET!;

  return async function (req: NextApiRequest, res: NextApiResponse) {
    const receivedSignature = req.headers['x-cld-signature'];
    const receivedTimestamp = req.headers['x-cld-timestamp'];
    const requestBody = JSON.stringify(req.body);

    const payload = `${requestBody}${receivedTimestamp}${secret}`;

    const calculatedSignature = crypto
      .createHash('sha1')
      .update(payload)
      .digest('hex');

    if (receivedSignature !== calculatedSignature) {
      res.status(401).json({ message: 'Invalid signature' });
      return;
    }

    requestHandler(req, res);
  };
};
