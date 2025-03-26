'use client';

import PageHeading from '@/app/components/ui/PageHeading';
import Container from '@/components/content/Container';

export default function Uses() {
  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Uses'} />
        <p className="text-dark dark:text-light">A list of the things I use.</p>
      </div>
    </Container>
  );
}
