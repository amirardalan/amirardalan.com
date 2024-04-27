import { v2 as cloudinary } from 'cloudinary';

const fetchPhotos = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'photos/',
  });

  return res.resources;
}

export { fetchPhotos };