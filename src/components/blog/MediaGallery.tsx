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
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

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
      <div
        className="grid grid-cols-4 gap-2"
        style={{ minHeight: `${Math.ceil(imagesPerPage / 4) * 75}px` }} // Reserve space for 12 images
      >
        {paginatedImages.map((url) => (
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
        {/* Fill empty slots to maintain consistent height */}
        {Array.from({ length: imagesPerPage - paginatedImages.length }).map(
          (_, index) => (
            <div
              key={`placeholder-${index}`}
              className="aspect-square bg-zinc-700"
            />
          )
        )}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`h-4 w-4 rounded-full ${
              currentPage === index + 1 ? 'bg-zinc-400' : 'bg-zinc-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
