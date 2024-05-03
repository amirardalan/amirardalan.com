import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';

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

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to browse images' });
  }
};

export default browseImagesHandler;
