import { FC, Key, useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { css } from '@emotion/react';
import Container from '@/components/Container';
import { photosContent } from '@/data/content';
import { PhotosTypes } from '@/types/photos';
import { fetchPhotos } from '@/lib/photos';
import LoadingTriangle from '@/components/LoadingTriangle';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Photos {
  url: string;
  created_at: string;
}

type PhotosProps = {
  photosText: PhotosTypes;
  photos: Photos[];
};

const Photos: FC<PhotosProps> = ({ photosText, photos }) => {
  const isTablet = useMediaQuery(1024);
  const isMobile = useMediaQuery(768);
  const priorityCount = isMobile ? 2 : isTablet ? 6 : 8;

  const [isLoaded, setIsLoaded] = useState(false);

  const stylePhotosPage = css({
    maxWidth: 1920,
    padding: '0 4rem',
    margin: '0 auto',
    '.photo': {
      WebkitTouchCallout: 'none',
      pointerEvents: 'none',
      userSelect: 'none',
      outline: 'none',
      opacity: !isLoaded ? 0 : 1,
      transition: 'opacity 1s',
    },
    '.grid': {
      margin: '4rem 0 6rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      '.gridItem': {
        background: !isLoaded
          ? 'linear-gradient(-45deg, var(--color-bg) 0%, var(--color-accent) 25%, var(--color-bg) 50%, var(--color-accent) 75%, var(--color-bg) 100%)'
          : 'var(--color-accent)',
        backgroundSize: '400% 300%',
        animation: `skeleton 4s linear infinite`,
        '@keyframes skeleton': {
          '0%': {
            backgroundPosition: '-300% 0',
          },
          '100%': {
            backgroundPosition: '100% 0',
          },
        },
        position: 'relative',
        overflow: 'hidden',
        img: {
          display: 'block',
          width: '100%',
          height: 'auto',
        },
      },
      '@media (max-width: 1600px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      '@media (max-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        margin: '2rem 0 4rem',
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(1, 1fr)',
        margin: '2rem 0 3rem',
      },
    },
    '@media (max-width: 1024px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 768px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '0 2rem',
    },
  });

  const sortPhotos = (photos: Photos[]) => {
    return photos.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  return (
    <Container
      title={photosText.meta.title}
      description={photosText.meta.description}
    >
      <main css={stylePhotosPage}>
        {!photos ? (
          <LoadingTriangle />
        ) : (
          <>
            <h1 className="pageHeading">{photosText.meta.title}</h1>
            <div className="grid">
              {sortPhotos(photos).map(
                (photo: { url: string }, index: Key | null | undefined) => (
                  <div key={index} className="gridItem">
                    <Image
                      src={photo.url}
                      alt={`Photo ${Number(index) + 1} of ${
                        photos.length
                      } by Amir Ardalan`}
                      width={1008}
                      height={1344}
                      onContextMenu={(e) => e.preventDefault()}
                      priority={
                        typeof index === 'number' && index < priorityCount
                      }
                      quality={100}
                      className="photo"
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </main>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const photos = await fetchPhotos();

  return {
    props: {
      photosText: photosContent,
      photos,
    },
  };
};

export default Photos;
