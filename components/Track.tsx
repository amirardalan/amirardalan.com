import Image from 'next/image'

export default function Track(track: any) {
  return (
    <div>
      <Image
        src={track.image}
        height="60"
        width="60"
        alt={track.title}
      />
      <p>
        {track.ranking}
      </p>
      <div>
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p>
          {track.artist}
        </p>
      </div>
    </div>
  )
}