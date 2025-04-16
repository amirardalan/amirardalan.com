export async function fetchImages(): Promise<string[]> {
  try {
    const res = await fetch('/api/cloudinary/upload');
    const data = await res.json();

    if (data.resources && Array.isArray(data.resources)) {
      return data.resources.map((img: { secure_url: any }) => img.secure_url);
    } else {
      console.error('Invalid response format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

export async function uploadImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (data.url) {
      return data.url;
    } else {
      console.error('Upload failed:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const res = await fetch('/api/cloudinary/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });
    const data = await res.json();

    return data.success || false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}
