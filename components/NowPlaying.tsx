import { css } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import Equalizer from '@/components/Equalizer'
import { spotify } from '@/data/content'

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher)
  const isOnline = data?.songUrl

  // Stlyes
  const styleNowPlayingContainer = css({
    marginBottom: '2.5rem',
    display: 'flex',
    background: '#8b8b8b',
  })
  const styleNowPlaying = css({
    position: 'relative',
    height: 200,
    width: '100%',
    overflow: 'hidden',
    '.nowPlayingStatus': {
      zIndex: 2,
      position: 'absolute',
      top: '2rem',
      left: '2rem',
      color: '#eee',
      fontSize: 12,
      textTransform: 'uppercase',
    },
    '@media(max-width: 480px)': {
      height: 350,
      '.nowPlayingStatus': {
        margin: '0 auto',
        top: '2rem',
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
      height: 350,
      background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5518867924528301) 200%)',
    },
  })
  const styleNowPlayingTrack = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    '.trackText': {
      'a, p': {
        lineHeight: '1.5rem',
        color: isOnline ? '#eee' : '#3e4449',
        letterSpacing: isOnline ? null : '-6px'
      },
      a: {
        fontSize: 'calc(1.5vw + 1.5vh)',
        '-webkit-marquee-increment': '0vw',
        fontFamily: 'var(--font-secondary)',
      },
      p: {
        fontSize: 16,
      },
    },
    '@media(max-width: 480px)': {
      marginTop: '1.5rem',
      lineHeight: '.8rem',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      textAlign: 'center',
      '.trackText': {
        margin: '1rem 0',
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
    backgroundSize: '110%',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    '@media(max-width: 480px)': {
      height: 350
    },
  })
  const styleImageOffline = css({
    backgroundImage: 'url(icons/spotify-offline.svg)',
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 135,
    width: 135,
    backgroundColor: '#14171a',
  })


  return (
    <>
      <div css={styleNowPlayingContainer}>
        <div css={styleNowPlaying}>
          <div css={styleNowPlayingBackground}></div>
          <div className="nowPlayingStatus">
            {isOnline ? (
            <p>
              <Equalizer /> {spotify.status.online}
            </p>)
            : (
            <p>
              {spotify.status.offline}
            </p>
            )}
          </div>
          <div css={styleNowPlayingInner}>
          {isOnline ? (
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
                    height="135"
                    width="135"
                    alt={data.title}
                  />
                </span>
              </div>
            </>
          ) : (
            <div css={styleNowPlayingTrack}>
            <span className="trackText">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                _____
              </a>
              <p>
                _____
              </p>
            </span>
            <div css={styleImageOffline} />
          </div>
          )}
          </div>
        </div>
      </div>
    </>
  )
}