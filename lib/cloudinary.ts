// Upload Image
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/cloudinary/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  const res = data.markdownUrl;

  return res;
};

// Browse Images

export const browseImages = async (): Promise<string[]> => {
  const response = await fetch('/api/cloudinary/browse', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to browse images');
  }

  const data = await response.json();
  const res = data.resources.map((resource: any) => resource.secure_url);

  return res;
};
