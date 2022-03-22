import { uses } from '@/data/content'
import Container from '@/components/Container'
import Uses from '@/components/Uses'

export default function UsesPage() {

  return (
    <Container title={uses.meta.title} description={uses.meta.description}>
      <main className="uses">
        <Uses />
      </main>
    </Container>
  )
}