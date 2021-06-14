import { css } from '@emotion/react'
import Container from '@/components/Container'
import NowPlaying from '@/components/NowPlaying'
import TopTracks from '@/components/TopTracks'
import Head from 'next/head'


export default function Spotify({toggleTheme}) {

  const styleSpotifyContainer = css({
    h3: {
      margin: '3.5rem 0 0 0',
      fontSize: 28,
      fontWeight: 'bold',
      color: 'var(--color-accent-gray)',
    }
  })

  return (
    <Container toggleTheme={toggleTheme}>
      <Head>
        <title>Spotify Dashboard | Amir Ardalan</title>
      </Head>
      <div className="spotify" css={styleSpotifyContainer}>
        <h2
          className="pageHeading"
          css={{
            marginBottom: '2rem',
          }}
        >
          Spotify Dashboard
        </h2>
        <NowPlaying />
        <h3>Top Tracks:</h3>
        <TopTracks />
      </div>
    </Container>
  )
}