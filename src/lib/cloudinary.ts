import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinaryImages = async (folder: string) => {
  const response = await cloudinary.api.resources({
    type: 'upload',
    prefix: folder,
    max_results: 100,
  });
  return response.resources;
};

export const generateUploadSignature = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'blog' },
    process.env.CLOUDINARY_API_SECRET!
  );
  return { timestamp, signature };
};
