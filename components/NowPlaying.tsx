import { css } from '@emotion/react'
import { spotify } from '@/data/content'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import Equalizer from '@/components/Equalizer'


export default function NowPlaying() {

  const { data } = useSWR('/api/spotify/now-playing', fetcher)
  const isOnline = data?.songUrl

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
      top: '1.5rem',
      left: '1.5rem',
      color: '#eee',
      fontSize: 12,
      textTransform: 'uppercase',
    },
    '@media(max-width: 480px)': {
      height: 350,
      '.nowPlayingStatus': {
        margin: '0 auto',
        top: 'unset',
        bottom: '1rem',
        left: '-50%',
        right: '-50%',
        textAlign: 'center',
        fontSize: 10,
      },
    },
  })
  const styleNowPlayingInner = css({
    display: 'flex',
    padding: '1.5rem',
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
      background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5518867924528301) 85%)',
    },
  })
  const styleNowPlayingTrack = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    '@media(max-width: 480px)': {
      marginTop: '1.8rem',
      lineHeight: '.8rem',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      textAlign: 'center',
    }
  })
  const styleTrackText = css({
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '.5rem',
  
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
      marginBottom: 5,
      lineHeight: 1,
      fontSize: 'calc(1.5vw + 1.5vh)',
      WebkitMarqueeIncrement: '0vw',
      fontFamily: 'var(--font-secondary)',
    },
    '.artist': {
      marginBottom: 2,
      lineHeight: 1,
      fontSize: 'calc(.8vw + .8vh)',
      WebkitMarqueeIncrement: '0vw',
    },
    '@media(max-width: 480px)': {
      paddingRight: 'unset',
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
    filter: 'blur(4px)',
    transform: 'scale(1.03)',
    height: 200,
    '@media(max-width: 480px)': {
      height: 350,
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

    <div css={styleNowPlayingContainer}>
      <div css={styleNowPlaying}>
        <div css={styleNowPlayingBackground}>
        {isOnline ? (
          <Image
            src={data?.albumImageUrl}
            layout="fill"
            objectFit="cover"
            priority
          /> ) : null }
        </div>
        <div className="nowPlayingStatus">
          {isOnline ? (
          <span>
            <Equalizer /> {spotify.status.online}
          </span>)
          : (
          <span>
            {spotify.status.offline}
          </span>
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
              <span css={{lineHeight: 0}}>
                <Image
                  src={data?.albumImageUrl}
                  height="150"
                  width="150"
                  alt={data.title}
                  priority
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
  )
}