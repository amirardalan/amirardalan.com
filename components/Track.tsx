import Image from 'next/image'

export default function Track(track: any) {
  return (
    <div className="grid">

      <div css={{
        fontSize: 'calc(3.5vw + 3.5vh)',
        color: 'var(--color-accent-gray)'
      }}>
        {track.ranking}
      </div>

      <div>
        <Image
          src={track.image}
          height="120"
          width="120"
          alt={track.title}
        />
      </div>

      <div>
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
      </div>

      <div>
        {track.artist}
      </div>

    </div>
  )
}