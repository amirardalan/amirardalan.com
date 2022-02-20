import { css } from '@emotion/react'
import Image from 'next/image'


export default function Track(track: any) {

  const styleTopTracksContainer = css({
    fontFamily: 'var(--font-secondary)',
    fontWeight: 'bold',
    '.grid': {
      padding: '2% 0',
      display: 'grid',
      gap: 20,
      gridTemplateColumns: '10% 20% 30% 30%',
      gridAutoRows: 'minmax(100px, auto)',
      borderBottom: '1px solid var(--color-accent)',
      fontSize: 'calc(1.2vw + 1.2vh)',
      WebkitMarqueeIncrement: '0vw',
      div: {
        display: 'flex',
        alignSelf: 'center',
      },
      '.rank': {
        fontSize: 'calc(2vw + 2vh)',
        WebkitMarqueeIncrement: '0vw',
        color: 'var(--color-accent-gray)',
      },
      '.title': {
        color: 'var(--color-text)',
        fontSize: 'calc(1.1vw + 1.1vh)',
      },
      '.title a, .artist p': {
        textDecoration: 'none',
      },
      '.artist': {
        fontFamily: 'var(--font-primary)',
        fontWeight: 'normal',
        fontSize: 'calc(.9vw + .9vh)',
      },
      '@media(max-width: 600px)': {
        gridTemplateColumns: '10% 38% 40%',
        gridAutoRows: 'minmax(0, auto)',
        '.image': {
          display: 'none'
        },
        '.title a, .artist p': {
          lineHeight: '1.2rem',
        },
      },
    }
  })

  return (
    <div css={styleTopTracksContainer}>
      <div className="grid">
        <div className="rank">
          {track.ranking}
        </div>
        <div className="image">
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={track.album}
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