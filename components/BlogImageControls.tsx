import { FC, useState, useRef } from 'react';
import { css } from '@emotion/react';
import { uploadImage, browseImages } from '@/lib/cloudinary';
import LoadingSpinner from '@/components/LoadingSpinner';
import CloseIcon from '@/components/CloseIcon';
import BlogImageBrowser from '@/components/BlogImageBrowser';

interface BlogImageControlsProps {
  onUploadSuccess: (url: string) => void;
  handleInsertImage: (url: string) => void;
}

const styleImageUploader = css({
  display: 'flex',
  fontFamily: 'var(--font-secondary)',
  fontSize: 13,
  input: {
    marginLeft: '.5rem',
  },
});

const styleLoadingIndicator = css({
  marginLeft: '.5rem',
});

const BlogImageControls: FC<BlogImageControlsProps> = ({
  onUploadSuccess,
  handleInsertImage,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileSelect = () => {
    setIsFileSelected(!!selectedFileRef.current?.value);
  };

  const handleClearImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedFileRef.current) {
      selectedFileRef.current.value = '';
      setIsFileSelected(false);
    }
  };

  const handleImageUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const selectedFile = selectedFileRef.current?.files?.[0];
    if (selectedFile) {
      setIsUploading(true);
      try {
        const url = await uploadImage(selectedFile);
        onUploadSuccess(url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
        handleClearImage(e);
        setIsFileSelected(false);
      }
    }
  };

  const handleOpenModal = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const images = await browseImages();
      console.log(images);
      setImages(images);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showModal ? (
        <BlogImageBrowser
          images={images}
          setShowModal={setShowModal}
          handleInsertImage={handleInsertImage}
        />
      ) : null}
      <div css={styleImageUploader}>
        <label className="imgLabel">
          <svg
            className="imgIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="var(--color-gray)"
          >
            <path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z" />
          </svg>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={selectedFileRef}
          />
          {isFileSelected ? (
            <>
              <button className="buttonCancel" onClick={handleClearImage}>
                <CloseIcon size={15} />
              </button>
              <button
                className="buttonCompact"
                onClick={handleImageUpload}
                disabled={!selectedFileRef.current || isUploading}
              >
                Upload
              </button>
            </>
          ) : null}
          <span css={styleLoadingIndicator}>
            {isUploading ? <LoadingSpinner size={20} /> : null}
          </span>
        </label>
        <button className="buttonCompact small" onClick={handleOpenModal}>
          Browse Images
        </button>
      </div>
    </>
  );
};

export default BlogImageControls;
