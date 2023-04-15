import Image from 'next/image';
import { css } from '@emotion/react';
import CloseIcon from '@/components/CloseIcon';
import { convertUrlToMarkdown } from '@/utils/convertUrlToMarkdown';
import { deleteImage } from '@/lib/cloudinary';
import { useState } from 'react';
import LoadingTriangle from '@/components/LoadingTriangle';

type BlogImageBrowserProps = {
  images: string[];
  setShowModal: (showModal: boolean) => void;
  handleInsertImage: (url: string) => void;
  loading: boolean;
};

const IMAGE_SIZE = 120;

const styleModal = css({
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 48,
  left: 0,
  zIndex: 5,
  backdropFilter: 'blur(8px)',
  '.loading': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
  },
  '.modalContent': {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    border: '3px solid var(--color-accent)',
    position: 'relative',
    maxWidth: '90vw',
    margin: '2rem auto',
    backgroundColor: 'var(--color-bg)',
    padding: '3rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.close': {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  '.imgGrid': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  '.imgContainer': {
    display: 'flex',
    flexDirection: 'column',
    img: {
      cursor: 'pointer',
      marginBottom: '.25rem',
    },
    '.imgThumb': {
      overflow: 'hidden',
      img: {
        maxHeight: IMAGE_SIZE,
        maxWidth: IMAGE_SIZE,
        objectFit: 'cover',
      },
    },
    '.imgDetails': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '.delete': {
    marginRight: '.5rem',
    svg: {
      marginTop: '.25rem',
    },
  },
  '.cancel': {
    color: 'var(--color-text)',
  },
});

const BlogImageBrowser = ({
  images,
  setShowModal,
  handleInsertImage,
  loading,
}: BlogImageBrowserProps) => {
  const [deletedImage, setDeletedImage] = useState('');

  const handleSelectImage = (url: string) => {
    handleInsertImage(convertUrlToMarkdown(url));
    setShowModal(false);
  };

  const handleImageDelete = async (public_id: string) => {
    try {
      await deleteImage(public_id);
      setDeletedImage(public_id);
    } catch (error) {
      console.error(error);
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div css={styleModal}>
      {loading ? (
        <div className="loading">
          <LoadingTriangle color="var(--color-text)" />
        </div>
      ) : (
        <div className="modalContent">
          <button className="close" onClick={() => setShowModal(false)}>
            <CloseIcon size={23} />
          </button>
          <div className="imgGrid">
            {images.map((image, index) => {
              const public_id = `Blog/${image
                ?.split('/')
                .pop()
                ?.split('.')
                .slice(0, -1)
                .join('.')}`;
              const imageName =
                image?.split('/').pop()?.split('_').slice(0, -1).join(' ') ??
                'Blog Image';
              if (public_id === deletedImage) {
                return null;
              }
              return (
                <div key={index} className="imgContainer">
                  <div className="imgThumb">
                    <Image
                      src={image}
                      width={IMAGE_SIZE}
                      height={IMAGE_SIZE}
                      alt={imageName}
                      aria-label={imageName}
                      onClick={() => handleSelectImage(image)}
                    />
                  </div>
                  <div className="imgDetails">
                    <button
                      className="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteConfirm(!showDeleteConfirm);
                        setSelectedImage(public_id);
                      }}
                    >
                      <CloseIcon size={13} color="var(--color-gray)" />
                    </button>
                    {showDeleteConfirm && selectedImage === public_id ? (
                      <div>
                        <button
                          className="cancel"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowDeleteConfirm(false);
                          }}
                        >
                          cancel
                        </button>{' '}
                        •{' '}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleImageDelete(public_id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    ) : (
                      <button
                        className="imgName"
                        onClick={() => handleSelectImage(image)}
                      >
                        {imageName}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogImageBrowser;
