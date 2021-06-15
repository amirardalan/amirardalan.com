import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Equalizer from '@/components/Equalizer'
import Link from 'next/link'
import { spotify } from '@/data/content'
import Image from 'next/image'
import { useTheme } from '@emotion/react'

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher)
  const isOnline = data?.songUrl
  const theme: any = useTheme()

  return (
    <>
    <h5 css={{ display: 'flex' }}>
      <Image
        src={theme.icon.spotify}
        height="15"
        width="15"
        alt="Spotify"
        aria-label="Spotify"
      />
      <span
        css={{ marginLeft: '.5rem' }}>
        { isOnline ? 'Now Playing' : 'Spotify' }
      </span>
    </h5>
    <li className="nowPlaying">
        <Link href={isOnline ? '/spotify' : '/spotify#top-tracks'}>
          <a>
          {isOnline
          ? <span>{data.artist} – {data.title}</span>
          : <span>Top Tracks</span> }
          </a>
        </Link>
      </li>
    </>
  )
}