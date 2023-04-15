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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.imgGrid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  '.imgContainer': {
    display: 'flex',
    flexDirection: 'column',
    img: {
      cursor: 'pointer',
      marginBottom: '.25rem',
    },
    '.imgDetails': {
      display: 'flex',
    },
  },
  '.delete': {
    marginRight: '.5rem',
    svg: {
      marginTop: '.2rem',
    },
  },
});

const BlogImageBrowser = ({
  images,
  setShowModal,
  handleInsertImage,
  loading,
}: BlogImageBrowserProps) => {
  const [deletedImage, setDeletedImage] = useState('');

  const handleClick = (url: string) => {
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
          <button onClick={() => setShowModal(false)}>
            <CloseIcon size={30} />
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
                  <Image
                    src={image}
                    width={256}
                    height={138}
                    alt={imageName}
                    aria-label={imageName}
                    onClick={() => handleClick(image)}
                  />
                  <div className="imgDetails">
                    <button
                      className="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteConfirm(!showDeleteConfirm);
                        setSelectedImage(public_id);
                      }}
                    >
                      <CloseIcon size={12} />
                    </button>
                    {showDeleteConfirm && selectedImage === public_id ? (
                      <span>
                        <button
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
                      </span>
                    ) : (
                      <span>{imageName}</span>
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
