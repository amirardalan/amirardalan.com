import Image from 'next/image';
import { css } from '@emotion/react';
import CloseIcon from '@/components/CloseIcon';
import { convertUrlToMarkdown } from '@/utils/convertUrlToMarkdown';
import { deleteImage } from '@/lib/image';
import { useState } from 'react';
import LoadingTriangle from '@/components/LoadingTriangle';

type BlogImageBrowserProps = {
  images: string[];
  setShowModal: (showModal: boolean) => void;
  handleInsertImage: (url: string) => void;
  loading: boolean;
};

const IMAGE_SIZE = 100;

const styleModal = css({
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 48,
  left: 0,
  zIndex: 5,
  backdropFilter: 'blur(8px)',
  '@media (max-width: 600px)': {
    top: 75,
  },
  '.loading': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
  },
  '.modal': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4rem auto',
    width: '90vw',
    maxWidth: 618,
    '@media (max-width: 480px)': {
      margin: '1rem auto',
    },
  },
  '.modalContent': {
    maxHeight: '90vh',
    overflowY: 'scroll',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    border: '3px solid var(--color-accent)',
    borderRadius: 5,
    backgroundColor: 'var(--color-bg)',
    padding: '2rem 1rem 2rem 2rem',
    '@media (max-width: 480px)': {
      padding: '1rem .5rem 1rem 1rem',
    },
  },
  '.modalHeader': {
    fontFamily: 'var(--font-secondary)',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: '1rem',
    '.close': {
      marginRight: '.5rem',
      display: 'flex',
      alignSelf: 'center',
    },
    h4: {
      marginLeft: '.4rem',
    },
  },
  '.imgGrid': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
  },
  '.imgContainer': {
    display: 'flex',
    flexDirection: 'column',
    '.imgThumb': {
      height: IMAGE_SIZE,
      width: IMAGE_SIZE,
      position: 'relative',
      overflow: 'hidden',
      img: {
        boxShadow: 'inset 0 0 0 2px transparent',
        objectFit: 'cover',
        zIndex: -1,
        '&:hover': {
          boxShadow: 'inset 0 0 0 2px var(--color-primary)',
          zIndex: 2,
        },
      },
      '&:hover::after': {
        border: '2px solid var(--color-primary)',
        pointerEvents: 'none',
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .25)',
      },
    },
    '.imgDetails': {
      maxWidth: IMAGE_SIZE,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-start',
    },
    '.imgText': {
      marginLeft: '.4rem',
      maxWidth: IMAGE_SIZE - 20,
      color: 'var(--color-text)',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '&.delete': {
        minWidth: 'fit-content',
        color: 'var(--color-warning)',
      },
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
        <div className="modal">
          <div className="modalHeader">
            <button className="close" onClick={() => setShowModal(false)}>
              <CloseIcon size={20} />
            </button>
            <h4>Image Library</h4>
          </div>
          <div className="modalContent">
            <div className="imgGrid">
              {[...images].reverse().map((image, index) => {
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
                    <button
                      className="imgThumb"
                      onClick={() => handleSelectImage(image)}
                    >
                      <Image
                        src={image}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        alt={imageName}
                        aria-label={imageName}
                      />
                    </button>
                    <div className="imgDetails">
                      <button
                        className="delete"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDeleteConfirm(!showDeleteConfirm);
                          setSelectedImage(public_id);
                        }}
                      >
                        <CloseIcon size={9} color="var(--color-gray)" />
                      </button>
                      {showDeleteConfirm && selectedImage === public_id ? (
                        <button
                          className="imgText delete"
                          onClick={(e) => {
                            e.preventDefault();
                            handleImageDelete(public_id);
                          }}
                        >
                          delete
                        </button>
                      ) : null}

                      <button
                        className="imgText"
                        onClick={() => handleSelectImage(image)}
                      >
                        {imageName}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogImageBrowser;
