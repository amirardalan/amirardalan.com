import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
