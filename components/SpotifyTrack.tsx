import { useTheme } from '@emotion/react'
import Image from 'next/image'

interface Track {
  ranking: number
  songUrl: string
  title: string
  artist: string
  album: string
  image: string
}

export default function Track(track: Track) {

 const theme: any = useTheme()

  return (
    <div className="topGrid">
      <div className="grid">
        <div className="rank">
          {track.ranking}
        </div>
        <div className="image">
          <Image
            src={track.image}
            height={100}
            width={100}
            alt={track.title}
          />
        </div>
        <div className="title">
          <div>
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {track.title}
              <span className="externalIcon">
                <Image
                  src={theme.icons.externalAlt}
                  width={15}
                  height={15}
                  alt={'Listen to '+track.title+' on Spotify'}
                />
              </span>
            </a>
          </div>
          <div className="artist">
            <p>{track.artist}</p>
          </div>
        </div>
      </div>
    </div>
  )
}