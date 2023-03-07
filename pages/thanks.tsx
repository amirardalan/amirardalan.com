import type { FC } from 'react';
import { thanksContent } from '@/data/content';
import Container from '@/components/Container';
import Thanks from '@/components/Thanks';

import { GetStaticProps } from 'next';
export const getStaticProps: GetStaticProps = async () => {
  return { props: { thanks: thanksContent } };
};

type ThanksPageProps = {
  thanks: {
    meta: {
      description: string;
    };
  };
};

const ThanksPage = ({ thanks }) => {
  return (
    <Container
      title={thanks.meta.title}
      description={thanks.meta.description}
      robots="noindex"
      date={null}
    >
      <main className="thanks">
        <Thanks content={thanks} />
      </main>
    </Container>
  );
};

export default ThanksPage;
