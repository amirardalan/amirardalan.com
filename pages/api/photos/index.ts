import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const photosHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Handle POST request
    // ...
  } else if (req.method === 'GET') {
    // Handle GET request
    try {
      const options = {
        type: 'upload',
        prefix: 'photos/',
        max_results: 500,
        context: true,
      };
      const result = await cloudinary.api.resources(options);

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to browse images' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default photosHandler;