import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Link from 'next/link'
import { spotifyContent } from '@/data/content'
import Image from 'next/image'
import { useTheme } from '@emotion/react'


export default function NowPlaying() {

  const { data } = useSWR('/api/spotify/now-playing', fetcher)
  const isOnline = data?.songUrl

  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  return (
    <>
      <h4 css={{ display: 'flex' }}>
        <Image
          src={isDarkTheme
            ? spotifyContent.icon?.dark
            : spotifyContent.icon?.light}
          height="15"
          width="15"
          alt="Spotify"
          aria-label="Spotify"
        />
        <span
          css={{ marginLeft: '.5rem' }}>
          { isOnline ? 'Now Playing' : 'Spotify' }
        </span>
      </h4>
      <ul>
        <li className="nowPlaying">
          <Link href={isOnline ? '/spotify' : '/spotify'}>
            <a>
            {isOnline
            ? <span>{data.artist} – {data.title}</span>
            : <span>{spotifyContent.headings.main}</span> }
            </a>
          </Link>
        </li>
      </ul>
    </>
  )
}