import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const browseImagesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const options = {
      type: 'upload',
      prefix: 'Blog/',
      max_results: 500,
      context: true,
    };
    const result = await cloudinary.api.resources(options);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to browse images' });
  }
};

export default browseImagesHandler;
