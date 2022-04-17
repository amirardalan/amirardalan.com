import { uses } from '@/data/content'
import Container from '@/components/Container'
import Uses from '@/components/Uses'

import { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async () => {
  return { props: { content: uses } }
}

export default function UsesPage({ content }) {
  return (
    <Container title={content.meta.title} description={content.meta.description}>
      <main className="uses">
        <Uses content={content} />
      </main>
    </Container>
  )
}