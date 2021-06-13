import { css } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher)

  const styleNowPlayingContainer = css({
    marginBottom: '2rem',
    display: 'flex',
    background: 'var(--color-accent)',
  })

  const styleNowPlaying = css({
    position: 'relative',
    height: 200,
    width: '100%',
    overflow: 'hidden',
    '@media(max-width: 480px)': {
      height: 300
    },
  })
  const styleNowPlayingInner = css({
    padding: '2rem',
    height: 200,
    width: '100%',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    color: '#eee',
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5518867924528301) 100%)',
    'a, p': {
      margin: 0,
      padding: 0,
      color: '#eee',
      textDecoration: 'none',
    },
    '@media(max-width: 480px)': {
      height: 300
    },
  })
  const styleNowPlayingTrack = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    a: {
      fontSize: 'calc(1.2vw + 1.2vh)',
      fontFamily: 'var(--font-secondary)',
    },
    p: {
      fontSize: 'calc(1vw + 1vh)',
    },
    '.trackText': {
      marginBottom: '1rem',
    },
    '@media(max-width: 480px)': {
      marginTop: '1rem',
      lineHeight: '.8rem',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  })
  const styleNowPlayingBackground = css({
    height: 200,
    width: '100%',
    backgroundImage: `url(${data?.albumImageUrl})`,
    backgroundSize: 'cover',
    backgroundPositionX: '50%',
    backgroundPositionY: '50%',
    backgroundRepeat: 'no-repeat',
    '@media(max-width: 480px)': {
      height: 300
    },
  })


  return (
    <div css={styleNowPlayingContainer}>
      <div css={styleNowPlaying}>
        <div css={styleNowPlayingBackground}></div>
        <div css={styleNowPlayingInner}>
        {data?.songUrl ? (
          <>
            <div css={styleNowPlayingTrack}>
              <span className="trackText">
                <a
                  href={data.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.title} {' - '}
                </a>
                <p>
                  {data?.artist ?? 'Spotify'}
                </p>
              </span>
              <span>
                <Image
                  src={data?.albumImageUrl}
                  height='135'
                  width='135'
                  alt={data.title}
                />
              </span>
            </div>
          </>
        ) : (
          <p>
            Not Playing
          </p>
        )}
        </div>
      </div>
    </div>
  )
}