import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Link from 'next/link'
import { spotify } from '@/data/content'
import Image from 'next/image'
import { useTheme } from '@emotion/react'


export default function NowPlaying() {

  const { data } = useSWR('/api/spotify/now-playing', fetcher)
  const isOnline = data?.songUrl

  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  return (
    <>
      <h5 css={{ display: 'flex' }}>
        <Image
          src={isDarkTheme
            ? spotify.icon?.dark
            : spotify.icon?.light}
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
      <ul>
        <li className="nowPlaying">
          <Link href={isOnline ? '/spotify' : '/spotify'}>
            <a>
            {isOnline
            ? <span>{data.artist} – {data.title}</span>
            : <span>{spotify.headings.main}</span> }
            </a>
          </Link>
        </li>
      </ul>
    </>
  )
}