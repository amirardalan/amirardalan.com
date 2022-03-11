import { css } from '@emotion/react'
import { spotify } from '@/data/content'
import Container from '@/components/Container'
import NowPlaying from '@/components/NowPlaying'
import TopTracks from '@/components/TopTracks'
import TopArtists from '@/components/TopArtists'
import Profile from '@/components/Profile'


export default function Spotify() {

  const styleSpotifyContainer = css({
    h3: {
      marginBottom: '2rem',
      paddingBottom: '.8rem',
      borderBottom: '2px solid var(--color-accent-color)',
      fontSize: 22,
      fontWeight: 'bold',
    },
    a: {
      color: 'var(--color-text)',
    },
    p: {
      lineHeight: '1.5rem',
    },
    '.topGrid': {
      fontFamily: 'var(--font-secondary)',
      fontWeight: 'bold',
      'span.externalIcon': {
        marginLeft: 5
      },
      '.grid': {
        display: 'grid',
        alignItems: 'center',
        gap: 20,
        marginBottom: '1rem',
        gridTemplateColumns: '8% 25% 65%',
        fontSize: 'calc(1.2vw + 1.2vh)',
        WebkitMarqueeIncrement: '0vw',
        div: {
          display: 'flex',
        },
        '.rank': {
          alignSelf: 'center',
          fontSize: 30,
          WebkitMarqueeIncrement: '0vw',
          color: 'var(--color-accent-gray)',
          '@media(max-width: 768px)': {
            fontSize: 13
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
        },
        '.artist': {
          fontFamily: 'var(--font-primary)',
          fontWeight: 'normal',
          fontSize: 14,
          color: 'var(--color-gray)',
          '@media(max-width: 768px)': {
            fontSize: 12
          },
          '@media(max-width: 480px)': {
            fontSize: 10,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: 140
          }
        },
        '@media(max-width: 600px)': {
          gridTemplateColumns: '2% 15% 62%',
          '.image': {
            width: 45,
            height: 45,
          },
          '.title a, .artist p': {
            lineHeight: '1.2rem',
          },
        },
      }
    }
  })


  const styleSpotifyModules = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyContent: 'space-between',
    gap: '1rem',
    '.module': {
      background: 'var(--color-accent)',
      padding: '2rem',
      '&:first-of-type': {
        background: 'none',
        padding: 0,
        gridColumn: '1 / 2',
        gridRow: '1',
        h3: {
          display: 'none',
        }
      },
      '&:nth-of-type(2)': {
        gridColumn: '2',
        gridRow: '1 / 1',
      },
      '&:nth-of-type(3)': {
        gridColumn: '2',
        gridRow: '2 / 3'
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
      },
      '@media(max-width: 768px)': {
        padding: '1rem',
      }
    },
    '@media(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: 40,
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
              <h3>{spotify.headings.profile}</h3>
              <Profile />
            </div>
            <div className="module">
              <h3>{spotify.headings.toptracks}</h3>
              <TopTracks />
            </div>
            <div className="module">
              <h3>{spotify.headings.topartists}</h3>
              <TopArtists />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}