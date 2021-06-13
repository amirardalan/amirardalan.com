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
      color: 'var(--color-accent-gray)',
      fontWeight: 'bold',
    }
  })
  const styleNowPlayingContainer = css({
    marginBottom: '2rem',
    padding: '.5rem 2rem',
    background: 'var(--color-accent)',
  })
  const styleTopTracksContainer = css({
    fontFamily: 'var(--font-secondary)',
    fontWeight: 'bold',
    '.grid': {
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20,
      gridAutoRows: 'minmax(120px, auto)',
      borderBottom: '1px solid var(--color-accent-gray)',
      '@media(max-width: 890px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      '@media(max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      '.grid': {
        display: 'flex',
        justifyContent: 'center',
        padding: '5rem',
        backgroundColor: 'var(--color-accent)',
        animation: 'slideUp .5s forwards',
        h4: {
          fontFamily: 'var(--font-secondary)'
        },
      }
    }
  })

  return (
    <Container toggleTheme={toggleTheme}>
      <Head>
        <title>Spotify</title>
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
        <div css={styleNowPlayingContainer}>
          <NowPlaying />
        </div>
        <h3>Top Tracks</h3>
        <div css={styleTopTracksContainer}>
          <TopTracks />
        </div>
      </div>
    </Container>
  )
}