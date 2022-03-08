import { css } from '@emotion/react'
import { spotify } from '@/data/content'
import Container from '@/components/Container'
import NowPlaying from '@/components/NowPlaying'
import TopTracks from '@/components/TopTracks'
import Profile from '@/components/Profile'


export default function Spotify() {

  const styleSpotifyContainer = css({
    h3: {
      marginBottom: '2rem',
      paddingBottom: '.8rem',
      borderBottom: '2px solid var(--color-accent-color)',
      fontSize: 28,
      fontWeight: 'bold',
      '@media (max-width: 1200px)': {
        margin: '1rem 0 1rem 0',
        fontSize: 22,
      }
    }
  })


  const styleSpotifyModules = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyContent: 'space-between',
    gap: '4rem',
    marginTop: '2rem',
    '.module': {
      '&:first-of-type': {
        gridColumn: '1 / 2',
        gridRow: '1',
      },
      '&:nth-of-type(2)': {
        gridColumn: '2',
        gridRow: '1 / 3',
      },
      '&:last-of-type': {
        gridColumn: '1',
        gridRow: '2 / 4',
      },
      '@media(max-width: 1024px)': {
        '&:nth-of-type(n)': {
          gridColumn: 'initial',
          gridRow: 'initial',
        },
      }
    },
    '@media(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: 0,
    }
  })

  return (
    <Container title={spotify.meta.title} description={spotify.meta.description}>
      <div className="spotify">
        <div css={styleSpotifyContainer}>
          <h1 className="pageHeading">
            {spotify.headings.main}
          </h1>
          <div css={styleSpotifyModules}>
            <div className="module">
              <h3>{spotify.headings.nowplaying}</h3>
              <NowPlaying />
            </div>
            <div className="module">
              <h3>{spotify.headings.toptracks}</h3>
              <TopTracks />
            </div>
            <div className="module">
              <h3>{spotify.headings.profile}</h3>
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}