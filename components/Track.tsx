export default function Track(track: any) {
  return (
    <div>
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