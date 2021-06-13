import { css, useTheme } from '@emotion/react'
import Container from '@/components/Container'
import TopTracks from '@/components/TopTracks'

import Head from 'next/head'


export default function Spotify({toggleTheme}) {
  const theme: any = useTheme()

  return (
    <Container toggleTheme={toggleTheme}>
      <Head>
        <title>Spotify</title>
      </Head>
      <main>
        <TopTracks />
      </main>
    </Container>
  )
}