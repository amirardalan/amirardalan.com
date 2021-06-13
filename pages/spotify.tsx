import { css, useTheme } from '@emotion/react'
import Container from '@/components/Container'
import NowPlaying from '@/components/NowPlaying'
import TopTracks from '@/components/TopTracks'
import Head from 'next/head'


export default function Spotify({toggleTheme}) {
  const theme: any = useTheme()

  const styleSpotifyContainer = css({
    h3: {
      marginBottom: '1rem',
      fontSize: 30,
      fontWeight: 'bold',
    }
  })

  return (
    <Container toggleTheme={toggleTheme}>
      <Head>
        <title>Spotify | Amir Ardalan</title>
      </Head>
      <div className="spotify" css={styleSpotifyContainer}>
        <h2
          className="pageHeading"
          css={{
            marginBottom: '2rem',
          }}
        >
          Amir's Spotify
        </h2>
        <h3>Now Playing</h3>
        <NowPlaying />
        <h3>Top Tracks</h3>
        <TopTracks />
      </div>
    </Container>
  )
}