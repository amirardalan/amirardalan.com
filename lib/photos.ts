import cloudinary from '@/lib/cloudinary';

const fetchPhotos = async () => {
  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'photos/',
    max_results: 500,
  });

  return res.resources;
};

export { fetchPhotos };
