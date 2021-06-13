import { css } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher)

  const styleNowPlayingContainer = css({
    marginBottom: '2rem',
    // padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--color-accent)',
  })

  const styleNowPlaying = css({
    justifyContent: 'space-around',
    position: 'relative',
    height: 200,
    width: '100%',
    overflow: 'hidden',
  })
  const styleNowPlayingInner = css({
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    width: '100%',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5518867924528301) 100%)',
  })
  const styleNowPlayingBackground = css({
    height: 200,
    width: '120%',
    backgroundImage: `url(${data?.albumImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '-50%',
    backgroundRepeat: 'no-repeat',
  })
  const styleNowPlayingTrack = css({
    fontFamily: 'var(--font-secondary)',
    fontSize: 'calc(1.5vw + 1.5vh)',
    lineHeight: '2.2rem',
  })

  return (
    <div css={styleNowPlayingContainer}>
      <div css={styleNowPlaying}>
        <div css={styleNowPlayingBackground}></div>
        <div css={styleNowPlayingInner}>
        {data?.songUrl ? (
          <>
            <Image
              src={data?.albumImageUrl}
              height='150'
              width='150'
              alt={data.title}
            />
            <div css={styleNowPlayingTrack}>
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.title}
              </a>
            </div>
            <p>
              {data?.artist ?? 'Spotify'}
            </p>
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