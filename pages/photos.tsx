import { FC, Key } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { css } from '@emotion/react';
import Container from '@/components/Container';
import { photosContent } from '@/data/content';
import { PhotosTypes } from '@/types/photos';
import { fetchPhotos } from '@/lib/photos';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import LoadingTriangle from '@/components/LoadingTriangle';

interface Photos {
  url: string;
  created_at: string;
}

type PhotosProps = {
  photosText: PhotosTypes;
  photos: Photos[];
};

const Photos: FC<PhotosProps> = ({ photosText, photos }) => {

  const stylePhotosPage = css({
    maxWidth: 1920,
    padding: '0 4rem',
    margin: '0 auto',
    '.grid': {
      margin: '2rem 0 6rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      '.gridItem': {
        position: 'relative',
        overflow: 'hidden',
        'img': {
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
  })

  const sortPhotos = (photos: Photos[]) => {
    return photos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return (
    <Container
      title={photosText.meta.title}
      description={photosText.meta.description}
    >
      <main css={stylePhotosPage}>
      {!photos ? <LoadingTriangle /> :
      <>
        <h1 className="pageHeading">{photosText.meta.title}</h1>
        <div className="grid">
          {sortPhotos(photos).map((photo: { url: string | StaticImport; }, index: Key | null | undefined) => (
            <div key={index} className="gridItem">
              <Image 
                src={photo.url} 
                alt={`Photo ${Number(index) + 1}`} 
                width={504} 
                height={672}
                onContextMenu={(e) => e.preventDefault()}
                style={{ 
                  WebkitTouchCallout: 'none', 
                  pointerEvents: 'none', 
                  userSelect: 'none', 
                  outline: 'none',
                }}
              />
            </div>
          ))}
        </div>
        </>}
      </main>
    </Container>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const photos = await fetchPhotos();

  return {
    props: {
      photosText: photosContent,
      photos,
    },
    revalidate: 1,
  };
}

export default Photos;