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
    display: 'flex',
  })
  const styleNowPlaying = css({
    position: 'relative',
    height: 226,
    width: '100%',
    overflow: 'hidden',
    '.nowPlayingStatus': {
      zIndex: 2,
      position: 'absolute',
      top: '2rem',
      left: '2rem',
      // color: '#e4e9f8',
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
    padding: '2rem',
    height: 226,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'red',
    background: 'linear-gradient(0deg, rgb(25, 26, 34, 1) 0%, rgb(25, 26, 34, 0.5518867924528301) 100%)',
    '@media(max-width: 480px)': {
      height: 350,
      background: 'linear-gradient(0deg, rgb(25, 26, 34, 1) 0%, rgb(25, 26, 34, 0.5518867924528301) 85%)',
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
      color: '#e4e9f8',
      textDecoration: 'none',
    },
    '.loadingTitle, .loadingArtist': {
      display: 'block',
      height: 10,
      backgroundColor: '#494a5c',
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
      fontSize: 'calc(1.2vw + 1.2vh)',
      WebkitMarqueeIncrement: '0vw',
      fontFamily: 'var(--font-secondary)',
    },
    '.artist': {
      marginBottom: 2,
      lineHeight: 1,
      fontSize: 'calc(.7vw + .7vh)',
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
    height: 226,
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
    backgroundColor: '#191a22',
  })

  const AlbumImage = () => {
    if(isOnline) {
      return (
        <Image
          src={data?.albumImageUrl}
          layout="fill"
          objectFit="cover"
          alt={data?.album}
          priority
        />
      )
    } else return null
  }

  const Status = () => {
    if (isOnline) return <span><Equalizer /> {spotify.status.online}</span>
      else return <span>{spotify.status.offline}</span>
  }

  const NowPlaying = () => {
    if (isOnline) {
      return (
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
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={data.album}
            >
              <Image
                src={data?.albumImageUrl}
                height="150"
                width="150"
                alt={data.title}
                priority
              />
            </a>
          </span>
        </div>
      )
    } else {
        return (
          <div css={styleNowPlayingTrack}>
            <span css={styleTrackText}>
              <span className="loadingTitle"></span>
              <span className="loadingArtist"></span>
            </span>
            <div css={styleImageOffline} />
          </div>
        )
    }
  }


  return (
    <div css={styleNowPlayingContainer}>
      <div css={styleNowPlaying}>
        <div css={styleNowPlayingBackground}>
          <AlbumImage/>
        </div>
        <div className="nowPlayingStatus">
          <Status/>
        </div>
        <div css={styleNowPlayingInner}>
          <NowPlaying/>
        </div>
      </div>
    </div>
  )
}