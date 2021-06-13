import Image from 'next/image'

export default function Track(track: any) {
  return (
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
          height="120"
          width="120"
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
  )
}