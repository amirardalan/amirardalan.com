import Container from '@/components/Container';
import { errorContent } from '@/data/content';

import { GetStaticProps } from 'next';
import ErrorLayout from '@/components/ErrorLayout';
export const getStaticProps: GetStaticProps = async () => {
  return { props: { error: errorContent.notFound } };
};

export default function CustomError({ error }) {
  return (
    <Container
      title={error.title}
      description={error.title}
      robots="noindex"
      date={null}
    >
      <ErrorLayout error={error} />
    </Container>
  );
}
