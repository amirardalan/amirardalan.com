import Head from 'next/head'
import { uses } from '@/data/content'
import Uses from '@/components/Uses'

export default function UsesPage() {

  return (
    <div className="container uses">
      <Head>
        <title>{uses.meta.title}</title>
      </Head>
      <Uses />
    </div>
  )
}