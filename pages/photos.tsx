import { FC, Key } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { css } from '@emotion/react';
import Container from '@/components/Container';
import { photosContent } from '@/data/content';
import { PhotosTypes } from '@/types/photos';
import { fetchPhotos } from '@/lib/photos';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';


type PhotosProps = {
  photosText: PhotosTypes;
  getPhotos: any[];
};

const Photos: FC<PhotosProps> = ({ photosText, getPhotos }) => {

  const { data: cloudinaryPhotos, error } = useSWR('/api/photos', Fetcher);

  if (error) return <div>Failed to load photos</div>
  if (!cloudinaryPhotos) return <div>Loading...</div>

  const stylePhotosPage = css({
    padding: '0 4rem',
    margin: '0 auto',
    '.grid': {
      marginTop: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(504px, 1fr))',
      gap: '2rem',
      '.gridItem': {
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

  return (
    <Container
      title={photosText.meta.title}
      description={photosText.meta.description}
    >
      <main css={stylePhotosPage}>
        <h1 className="pageHeading">{photosText.meta.title}</h1>
        <div className="grid">
          {getPhotos.map((photo: { url: string | StaticImport; }, index: Key | null | undefined) => (
            <div key={index} className="gridItem">
              <Image src={photo.url} alt={`Photo ${Number(index) + 1}`} width={504} height={672} />
            </div>
          ))}
        </div>
      </main>
    </Container>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const getPhotos = await fetchPhotos();
  const photosText = photosContent;

  return {
    props: {
      photosText,
      getPhotos,
    },
  };
}

export default Photos;