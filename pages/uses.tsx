import { NextPage, GetStaticProps } from 'next';
import Container from '@/components/Container';
import Uses from '@/components/Uses';

import { usesContent } from '@/data/content';
import { UsesTypes } from '@/types/uses';

export const getStaticProps: GetStaticProps = async () => {
  return { props: { uses: usesContent } };
};

interface UsesPageProps {
  uses: UsesTypes;
}

const UsesPage: NextPage<UsesPageProps> = ({ uses }) => {
  return (
    <Container title={uses.meta.title} description={uses.meta.description}>
      <main className="uses">
        <Uses content={uses} />
      </main>
    </Container>
  );
};

export default UsesPage;
