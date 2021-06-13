import { css } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import Equalizer from '@/components/Equalizer'

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher)

  const styleNowPlayingContainer = css({
    marginBottom: '2.5rem',
    display: 'flex',
    background: 'var(--color-accent)',
  })

  const styleNowPlaying = css({
    position: 'relative',
    height: 200,
    width: '100%',
    overflow: 'hidden',
    '.nowPlayingStatus': {
      zIndex: 2,
      position: 'absolute',
      top: '1.5rem',
      left: '2rem',
      color: '#b8c1c7',
      fontSize: 14,
    },
    '@media(max-width: 480px)': {
      height: 350,
      '.nowPlayingStatus': {
        margin: '0 auto',
        left: '-50%',
        right: '-50%',
        textAlign: 'center',
        fontSize: 10,
      },
    },
  })
  const styleNowPlayingInner = css({
    display: 'flex',
    padding: '2rem',
    height: 200,
    width: '100%',
    alignItems: 'center',
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
      height: 350
    },
  })
  const styleNowPlayingTrack = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    a: {
      fontSize: 'calc(1.5vw + 1.5vh)',
      '-webkit-marquee-increment': '0vw',
      fontFamily: 'var(--font-secondary)',
    },
    p: {
      fontSize: 16,
    },
    'a, p': {
      lineHeight: '1.5rem',
    },
    '@media(max-width: 480px)': {
      marginTop: '1.5rem',
      lineHeight: '.8rem',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      textAlign: 'center',
      '.trackText': {
        marginTop: '1rem',
      },
      a: {
        fontSize: 20,
        lineHeight: '1.5rem',
        marginBottom: '.6rem',
        display: 'block',
      },
      p: {
        fontSize: 12,
        lineHeight: '.9rem'
      },
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
      height: 350
    },
  })


  return (
    <>
      <div css={styleNowPlayingContainer}>
        <div css={styleNowPlaying}>
          <div css={styleNowPlayingBackground}></div>
          <div className="nowPlayingStatus">
            {data?.songUrl ? (
            <p>
              <Equalizer /> Now Playing:
            </p>)
            : (
            <p>Currently Offline</p>
            )}
          </div>
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
                  {data.title}
                  </a>
                  <p>
                    {data.artist}
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
            <div css={styleNowPlayingTrack}>
            <span className="trackText">
              <a
                href='/'
                target="_blank"
                rel="noopener noreferrer"
              >
                _____
              </a>
              <p>
                _____
              </p>
            </span>
            <div css={{
              height: 135,
              width: 135,
              backgroundColor: '#14171a',
            }}>
            </div>
          </div>
          )}
          </div>
        </div>
      </div>
    </>
  )
}