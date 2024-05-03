import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import cloudinary from '@/lib/cloudinary';

interface MulterRequest extends NextApiRequest {
  file: {
    mimetype: string;
    size: number;
    filename: string;
    path: string;
    buffer: Buffer;
    originalname: string;
  };
}

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImageHandler = async (req: MulterRequest, res: NextApiResponse) => {
  try {
    const data = await new Promise((resolve, reject) => {
      upload.single('image')(req as any, res as any, (err) => {
        if (err) {
          reject(err);
        } else {
          const fileBuffer = req.file.buffer;
          const fileName = req.file.originalname;
          const nameWithoutExtension = fileName
            .replace(/\s+/g, '_')
            .split('.')
            .slice(0, -1)
            .join('.');
          const randomString = [...Array(6)]
            .map(() => Math.floor(Math.random() * 26) + 97)
            .map((charCode) => String.fromCharCode(charCode))
            .join('');
          const publicId = `${nameWithoutExtension}_${randomString}`;
          const uploadOptions = {
            folder: 'Blog',
            public_id: publicId,
            unique_filename: false,
            overwrite: false,
          };
          const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error: any, result: any) => {
              if (error) {
                console.error(error);
                reject(error);
              } else {
                const { secure_url } = result;
                resolve({
                  success: true,
                  data: {
                    url: secure_url,
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
    const { url } = (data as { success: boolean; data: { url: string } }).data;
    res.status(200).json({
      success: true,
      url: url,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
};

export default uploadImageHandler;
