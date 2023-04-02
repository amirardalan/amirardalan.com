import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

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
    const data = await new Promise((resolve, reject) => {
      upload.single('image')(req as any, res as any, (err) => {
        if (err) {
          reject(err);
        } else {
          const fileBuffer = req.file.buffer;
          const fileNameWithoutExtension = req.file.originalname
            .split('.')
            .slice(0, -1)
            .join('.');
          const publicId = `${fileNameWithoutExtension}_${uuidv4().substr(
            0,
            5
          )}`;
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'Blog',
              public_id: publicId,
              unique_filename: false,
            },
            (error: any, result: any) => {
              if (error) {
                console.error(error);
                reject(error);
              } else {
                resolve({
                  success: true,
                  data: {
                    url: result.secure_url,
                    publicId: result.public_id,
                  },
                  message: 'File uploaded successfully',
                });
              }
            }
          );
          stream.end(fileBuffer);
        }
      });
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
};

export default uploadImageHandler;
