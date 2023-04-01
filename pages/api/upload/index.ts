import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImageHandler = async (
  req: NextApiRequest & { file: any },
  res: NextApiResponse<any>
) => {
  try {
    await new Promise<void>((resolve, reject) => {
      upload.single('image')(req as any, res as any, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    const file = req.file.path;
    console.log('imageFile: ', file);

    const result: UploadApiResponse = await cloudinary.uploader.upload(file, {
      folder: 'blog-images',
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      message: 'File uploaded successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
};

export default uploadImageHandler;
