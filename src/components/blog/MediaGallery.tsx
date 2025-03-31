'use client';

import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';

interface MediaGalleryProps {
  onSelect: (url: string) => void;
}

export default function MediaGallery({ onSelect }: MediaGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-dark dark:text-light">Loading...</p>;

  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((url) => (
        <div
          key={url}
          className="aspect-square cursor-pointer overflow-hidden"
          onClick={() => onSelect(url)}
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
  );
}
