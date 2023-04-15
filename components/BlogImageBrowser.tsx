import Image from 'next/image';
import { css } from '@emotion/react';
import CloseIcon from '@/components/CloseIcon';
import { convertUrlToMarkdown } from '@/utils/convertUrlToMarkdown';
import { deleteImage } from '@/lib/cloudinary';

type BlogImageBrowserProps = {
  images: string[];
  setShowModal: (showModal: boolean) => void;
  handleInsertImage: (url: string) => void;
};

const styleModal = css({
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 48,
  left: 0,
  zIndex: 5,
  backdropFilter: 'blur(8px)',
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
    img: {
      cursor: 'pointer',
    },
  },
});

const BlogImageBrowser = ({
  images,
  setShowModal,
  handleInsertImage,
}: BlogImageBrowserProps) => {
  const handleClick = (url: string) => {
    handleInsertImage(convertUrlToMarkdown(url));
    setShowModal(false);
  };

  const handleImageDelete = (public_id: string) => {
    deleteImage(public_id);
  };

  return (
    <div css={styleModal}>
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
                <span onClick={() => handleImageDelete(public_id)}>Delete</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogImageBrowser;
