import type { FC } from 'react';
import { GetStaticProps } from 'next';

import Container from '@/components/Container';
import Thanks from '@/components/Thanks';

import { thanksContent } from '@/data/content';

export const getStaticProps: GetStaticProps = async () => {
  return { props: { thanks: thanksContent } };
};

type ThanksPageProps = {
  thanks: {
    meta: {
      title: string;
      description: string;
    };
  };
};

const ThanksPage: FC<ThanksPageProps> = ({ thanks }) => {
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
