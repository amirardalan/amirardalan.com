import { usesContent } from '@/data/content';
import Container from '@/components/Container';
import Uses from '@/components/Uses';

import { GetStaticProps } from 'next';
export const getStaticProps: GetStaticProps = async () => {
  return { props: { uses: usesContent } };
};

export default function UsesPage({ uses }) {
  return (
    <Container title={uses.meta.title} description={uses.meta.description}>
      <main className="uses">
        <Uses content={uses} />
      </main>
    </Container>
  );
}
