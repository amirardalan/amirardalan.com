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
  const res = data.url;

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

// Delete Image
export const deleteImage = async (public_id: string): Promise<void> => {
  const response = await fetch(`/api/cloudinary/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ public_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
};
