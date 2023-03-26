import { FC } from 'react';
import { GetStaticProps } from 'next';
import Container from '@/components/Container';
import ErrorLayout from '@/components/ErrorLayout';
import { errorContent } from '@/data/content';
import { ErrorProps } from '@/types/error';

export const getStaticProps: GetStaticProps = async () => {
  return { props: { error: errorContent.internalServerError } };
};

const Error505: FC<ErrorProps> = ({ error }) => {
  return (
    <Container title={error.title} description={error.title} robots="noindex">
      <ErrorLayout error={error} />
    </Container>
  );
};

export default Error505;
