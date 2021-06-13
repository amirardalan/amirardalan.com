import { css } from '@emotion/react'
import Image from 'next/image'

export default function Track(track: any) {

  const styleTopTracksContainer = css({
    fontFamily: 'var(--font-secondary)',
    fontWeight: 'bold',
    '.grid': {
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20,
      gridAutoRows: 'minmax(100px, auto)',
      borderBottom: '1px solid var(--color-accent-gray)',
      '@media(max-width: 890px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'minmax(60px, auto)',
      },
      '@media(max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridAutoRows: 'minmax(0, auto)',
      },
    }
  })

  return (
    <div css={styleTopTracksContainer}>
      <div className="grid">

        <div
          className="rank"
          css={{
            fontSize: 'calc(3.5vw + 3.5vh)',
            color: 'var(--color-accent-gray)',
          }}>
          {track.ranking}
        </div>

        <div className="image">
          <Image
            src={track.image}
            height="100"
            width="100"
            alt={track.title}
          />
        </div>

        <div className="title">
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {track.title}
          </a>
        </div>

        <div className="artist">
          {track.artist}
        </div>

      </div>
    </div>
  )
}