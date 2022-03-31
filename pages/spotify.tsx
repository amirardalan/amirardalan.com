import { css } from '@emotion/react'
import { spotify } from '@/data/content'
import Container from '@/components/Container'
import NowPlaying from '@/components/SpotifyPlayer'
import TopTracks from '@/components/SpotifyTopTracks'
import TopArtists from '@/components/SpotifyTopArtists'
import Profile from '@/components/Profile'


export default function Spotify() {

  const styleSpotifyContainer = css({
    h3: {
      marginBottom: '2rem',
      paddingBottom: '.8rem',
      borderBottom: '2px solid var(--color-primary)',
      fontSize: 22,
      fontWeight: 'bold',
    },
    a: {
      color: 'var(--color-text)',
    },
    '.topGrid': {
      fontFamily: 'var(--font-secondary)',
      fontWeight: 'bold',
      lineHeight: '1.5rem',
      'span.externalIcon': {
        marginLeft: 5
      },
      '.grid': {
        display: 'grid',
        alignItems: 'center',
        gap: '4rem',
        marginBottom: '1rem',
        gridTemplateColumns: '10% 20% 60%',
        fontSize: 'calc(1.2vw + 1.2vh)',
        WebkitMarqueeIncrement: '0vw',
        div: {
          display: 'flex',
        },
        '.rank': {
          alignSelf: 'center',
          fontSize: 30,
          WebkitMarqueeIncrement: '0vw',
          color: 'var(--color-accent-neutral)',
          '@media(max-width: 480px)': {
            fontSize: 18
          }
        },
        '.title': {
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: 'var(--color-text)',
          fontSize: 20,
          '@media(max-width: 768px)': {
            fontSize: 16
          },
          '@media(max-width: 480px)': {
            fontSize: 12
          },
        },
        '.title a, .artist p': {
          textDecoration: 'none',
          '@media(max-width: 480px)': {
            lineHeight: '.8rem',
          }
        },
        '.artist': {
          marginTop: 5,
          fontFamily: 'var(--font-primary)',
          fontWeight: 'normal',
          fontSize: 14,
          color: 'var(--color-neutral)',
          '@media(max-width: 768px)': {
            fontSize: 12
          },
          '@media(max-width: 480px)': {
            fontSize: 10,
          }
        },
        '@media(max-width: 480px)': {
          gridTemplateColumns: '5% 20% 60%',
          '.image': {
            width: 60,
            height: 60,
          },
        },
      }
    }
  })


  const styleSpotifyModules = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyContent: 'space-between',
    gap: '4rem',
    '.module': {
      '&.player': {
        background: 'none',
        padding: 0,
        gridColumn: '1 / 2',
        gridRow: '1',
        h3: {
          display: 'none',
        }
      },
      '&.profile': {
        gridColumn: '2',
        gridRow: '1 / 1',
      },
      '@media(max-width: 1024px)': {
        '&.module': {
          gridColumn: 'initial',
          gridRow: 'initial',
        },
      },
    },
    '@media(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: 40,
    }
  })

  return (
    <Container title={spotify.meta.title} description={spotify.meta.description}>
      <main className="spotify">
        <div css={styleSpotifyContainer}>
          <h1 className="pageHeading">
            {spotify.headings.main}
          </h1>
          <div css={styleSpotifyModules}>
            <div className="module player">
              <h3>{spotify.headings.nowplaying}</h3>
              <NowPlaying />
            </div>
            <div className="module profile">
              <h3>{spotify.headings.profile}</h3>
              <Profile />
            </div>
            <div className="module tracks">
              <h3>{spotify.headings.toptracks}</h3>
              <TopTracks />
            </div>
            <div className="module artists">
              <h3>{spotify.headings.topartists}</h3>
              <TopArtists />
            </div>
          </div>
        </div>
      </main>
    </Container>
  )
}