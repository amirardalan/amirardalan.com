import { css } from '@emotion/react'
import Image from 'next/image'

export default function Track(track: any) {

  const styleTopTracksContainer = css({
    fontFamily: 'var(--font-secondary)',
    fontWeight: 'bold',
    '.grid': {
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: '10% 30% 30% 30%',
      gap: 20,
      gridAutoRows: 'minmax(100px, auto)',
      borderBottom: '1px solid var(--color-accent)',
      fontSize: 'calc(1.2vw + 1.2vh)',
      '-webkit-marquee-increment': '0vw',
      div: {
        display: 'flex',
        alignSelf: 'center',
      },
      a: {
        color: 'var(--color-text)',
      },
      'a, p': {
        lineHeight: '1.2rem',
      },
      '.artist': {
        fontFamily: 'var(--font-primary)',
      },
      '@media(max-width: 890px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'minmax(60px, auto)',
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
            '-webkit-marquee-increment': '0vw',
            color: 'var(--color-accent-gray)',
          }}>
          {track.ranking}
        </div>

        <div className="image">
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={track.image}
              height="100"
              width="100"
              alt={track.title}
            />
          </a>
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
          <p>{track.artist}</p>
        </div>

      </div>
    </div>
  )
}