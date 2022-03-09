import { useTheme } from '@emotion/react'
import Image from 'next/image'

interface Artist {
  ranking: number
  artist: string
  image: string
  link: string
}

export default function Artist(artist: Artist) {

  const theme: any = useTheme()

  return (
    <div className="topGrid">
      <div className="grid">
        <div className="rank">
          {artist.ranking}
        </div>
        <div className="image">
          <Image
            src={artist.image}
            height="100"
            width="100"
            alt={artist.artist}
          />
        </div>
        <div className="track title">
          <a
            href={artist.link}
            target="_blank"
            rel="noopener noreferrer"
            title={artist.artist}
          >
            <p>
              {artist.artist}
              <span className="externalIcon">
                <Image
                  src={theme.icons.externalAlt}
                  width={15}
                  height={15}
                  alt={'Listen to '+artist.artist+' on Spotify'}
                />
              </span>
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}