import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import SpotifyArtist from '@/components/SpotifyArtist'


export default function SpotifyTopArtists() {
  
  const { data } = useSWR('/api/spotify/top-artists', fetcher)

  if (!data) {
    return null
  }
  interface Artist {
    ranking: number
    artist: string
    image: string
    link: string
  }

  return data.artists.map((artist: Artist, index: number) => (
    <SpotifyArtist ranking={index + 1} key={SpotifyArtist.name + index} {...artist} />
  ))
}