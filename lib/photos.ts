import cloudinary from '@/lib/cloudinaryConfig';

const fetchPhotos = async () => {

  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'photos/',
  });

  return res.resources;
}

export { fetchPhotos };