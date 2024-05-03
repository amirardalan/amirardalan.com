import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';

const deleteImageHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const public_id = req.body.public_id;
    const result = await cloudinary.uploader.destroy(public_id);
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};

export default deleteImageHandler;
