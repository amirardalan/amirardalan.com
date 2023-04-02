import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

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
          const fileName = req.file.originalname;
          const nameWithoutExtension = fileName
            .split('.')
            .slice(0, -1)
            .join('.');
          const imageName = nameWithoutExtension
            .split('_')[0]
            .replace(/[-_]/g, ' ');
          const altText = imageName.replace(/(\b\w)/g, (match: string) =>
            match.toUpperCase()
          );
          const randomString = [...Array(5)]
            .map(() => Math.floor(Math.random() * 26) + 97)
            .map((charCode) => String.fromCharCode(charCode))
            .join('');
          const publicId = `${nameWithoutExtension}_${randomString}`;
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
                const { secure_url, public_id } = result;
                const markdownUrl = `![${altText}](${secure_url})`;
                resolve({
                  success: true,
                  data: {
                    url: secure_url,
                    publicId: public_id,
                    markdownUrl: markdownUrl,
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
    const publicId = (data as { success: boolean; data: { publicId: string } })
      .data.publicId;
    const altText = publicId
      .replace(/^.*\//, '')
      .split('_')[0]
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (match: string) => match.toUpperCase());
    const { url } = (data as { success: boolean; data: { url: string } }).data;
    const markdownUrl = `![${altText}](${url})`;
    console.log(markdownUrl);
    res.status(200).json({
      success: true,
      data: {
        url: url,
        markdownUrl: markdownUrl,
      },
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
};

export default uploadImageHandler;
