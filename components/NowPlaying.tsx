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
    '@media(max-width: 480px)': {
      marginTop: '1.5rem',
      lineHeight: '.8rem',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      textAlign: 'center',
    }
  })
  const styleTrackText = css({
    display: 'flex',
    flexDirection: 'column',
  
    '.title, .artist': {
      margin: 0,
      padding: 0,
      color: '#eee',
      textDecoration: 'none',
    },
    '.loadingTitle, .loadingArtist': {
      display: 'block',
      height: 10,
      backgroundColor: '#3e4449',
    },
    '.loadingTitle': {
      width: 175,
      marginBottom: 5,
    },
    '.loadingArtist': {
      width: 95,
      marginBottom: 5,
    },
    '.title': {
      fontSize: 'calc(1.5vw + 1.5vh)',
      WebkitMarqueeIncrement: '0vw',
      fontFamily: 'var(--font-secondary)',
    },
    '.artist': {
      fontSize: 'calc(.8vw + .8vh)',
      WebkitMarqueeIncrement: '0vw',
    },
    '@media(max-width: 480px)': {
      lineHeight: '1.5rem',
      margin: '1rem 0',
      alignItems: 'center',
      '.title': {
        fontSize: 20,
        marginBottom: '.6rem',
        display: 'block',
      },
      '.artist': {
        fontSize: 12,
        lineHeight: '.9rem'
      },
    }
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
                <span css={styleTrackText}>
                  <a
                    href={data.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="title"
                  >
                  {data.title}
                  </a>
                  <p className="artist">
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
            <span css={styleTrackText}>
              <span className="loadingTitle"></span>
              <span className="loadingArtist"></span>
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