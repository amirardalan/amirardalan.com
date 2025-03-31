'use client';

import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { useToast } from '@/components/ui/ToastContext';

interface MediaGalleryProps {
  onSelect: (url: string) => void;
}

export default function MediaGallery({ onSelect }: MediaGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/cloudinary/upload');
        const data = await res.json();

        // Ensure resources exist and are an array
        if (data.resources && Array.isArray(data.resources)) {
          setImages(data.resources.map((img: any) => img.secure_url));
        } else {
          console.error('Invalid response format:', data);
          setImages([]); // Set to an empty array if resources are missing
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]); // Set to an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        setImages((prev) => [data.url, ...prev]);
        showToast('Image uploaded successfully!', 'success'); // Show success toast
      } else {
        console.error('Upload failed:', data.error);
        showToast('Failed to upload image.', 'error'); // Show error toast
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      showToast('Failed to upload image.', 'error'); // Show error toast
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-dark dark:text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-4">
        <label className="cursor-pointer rounded bg-zinc-600 px-4 py-2 text-white">
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((url) => (
          <div
            key={url}
            className="aspect-square cursor-pointer overflow-hidden"
            onClick={() => onSelect(url)} // User clicks to insert the image
          >
            <CldImage
              src={url}
              width="300"
              height="300" // Ensure square dimensions
              alt="Media"
              className="h-full w-full object-cover" // Ensure the image fills the square
            />
          </div>
        ))}
      </div>
    </div>
  );
}
