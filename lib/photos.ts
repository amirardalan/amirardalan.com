import cloudinary from '@/lib/cloudinary';

const fetchPhotos = async () => {
  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'photos/',
  });

  return res.resources;
};

export { fetchPhotos };
