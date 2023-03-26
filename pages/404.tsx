import { GetStaticProps, NextPage } from 'next';
import Container from '@/components/Container';
import ErrorLayout from '@/components/ErrorLayout';
import { errorContent } from '@/data/content';
import { ErrorTypes } from '@/types/error';

export const getStaticProps: GetStaticProps = async () => {
  return { props: { error: errorContent.notFound } };
};

type ErrorProps = { error: ErrorTypes };

const Error404: NextPage<ErrorProps> = ({ error }) => {
  return (
    <Container title={error.title} description={error.title} robots="noindex">
      <ErrorLayout error={error} />
    </Container>
  );
};

export default Error404;
