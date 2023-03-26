import { NextPage, GetStaticProps } from 'next';

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
    heading: string;
    copy: string;
  };
};

const ThanksPage: NextPage<ThanksPageProps> = ({ thanks }) => {
  return (
    <Container
      title={thanks.meta.title}
      description={thanks.meta.description}
      robots="noindex"
    >
      <main className="thanks">
        <Thanks content={thanks} />
      </main>
    </Container>
  );
};

export default ThanksPage;
