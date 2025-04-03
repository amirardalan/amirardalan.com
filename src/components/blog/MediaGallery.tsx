'use client';

import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { useToast } from '@/components/ui/ToastContext';
import {
  fetchImages,
  uploadImage,
  deleteImage,
} from '@/src/db/services/image-service';

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
    const loadImages = async () => {
      setLoading(true);
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
      setLoading(false);
    };
    loadImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        uploadedUrls.push(uploadedUrl);
      } else {
        showToast(`Failed to upload ${file.name}.`, 'error');
      }
    }

    if (uploadedUrls.length > 0) {
      setImages((prev) => [...uploadedUrls, ...prev]);
      showToast('Images uploaded successfully!', 'success');
    }
    setUploading(false);
  };

  const handleDelete = async (publicId: string) => {
    const success = await deleteImage(publicId);

    if (success) {
      setImages((prev) => prev.filter((url) => !url.includes(publicId)));
      showToast('Image deleted successfully!', 'success');
    } else {
      showToast('Failed to delete image.', 'error');
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
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>
      <div
        className="grid grid-cols-4 gap-2"
        style={{ minHeight: `${Math.ceil(imagesPerPage / 4) * 75}px` }}
      >
        {paginatedImages.map((url) => (
          <div
            key={url}
            className="group relative aspect-square cursor-pointer overflow-hidden"
            onClick={() => onSelect(url)}
            onContextMenu={(e) => {
              e.preventDefault();
              const publicId = url.split('/').slice(-2).join('/').split('.')[0]; // Extract publicId
              if (publicId) handleDelete(publicId);
            }}
          >
            <CldImage
              src={url}
              width="300"
              height="300"
              alt="Media"
              className="h-full w-full object-cover transition duration-200 group-hover:brightness-75"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                const publicId = url
                  .split('/')
                  .slice(-2)
                  .join('/')
                  .split('.')[0]; // Extract publicId
                if (publicId) handleDelete(publicId);
              }}
              className="absolute right-0 top-0 hidden bg-zinc-500 px-1.5 py-0.5 text-xl leading-none text-white hover:bg-red-600 group-hover:block"
            >
              ×
            </button>
          </div>
        ))}

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
