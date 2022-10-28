import { thanksContent } from '@/data/content'
import Container from '@/components/Container'
import Thanks from '@/components/Thanks'

import { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async () => {
  return { props: { thanks: thanksContent } }
}

export default function ThanksPage({ thanks }) {
  return (
    <Container title={thanks.meta.title} description={thanks.meta.description} robots="noindex">
      <main className="thanks">
        <Thanks content={thanks} />
      </main>
    </Container>
  )
}