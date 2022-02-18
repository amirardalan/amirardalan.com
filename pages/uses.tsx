import Head from 'next/head'
import { uses } from '@/data/content'
import Container from '@/components/Container'
import Uses from '@/components/Uses'

export default function UsesPage() {

  return (
    <Container>
      <div className="uses">
        <Head>
          <title>{uses.meta.title}</title>
        </Head>
        <Uses />
      </div>
    </Container>
  )
}