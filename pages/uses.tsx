import { NextPage, GetStaticProps } from 'next';
import Container from '@/components/Container';
import Uses from '@/components/Uses';
import { css } from '@emotion/react';

import { usesContent } from '@/data/content';
import { UsesTypes } from '@/types/uses';

export const getStaticProps: GetStaticProps = async () => {
  return { props: { uses: usesContent } };
};

interface UsesPageProps {
  uses: UsesTypes;
}

const UsesPage: NextPage<UsesPageProps> = ({ uses }) => {
  const styleUsesPage = css({
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

  return (
    <Container title={uses.meta.title} description={uses.meta.description}>
      <main css={styleUsesPage}>
        <Uses content={uses} />
      </main>
    </Container>
  );
};

export default UsesPage;
