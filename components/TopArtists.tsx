import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Artist from '@/components/Artist'


export default function TopArtists() {
  
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
    <Artist ranking={index + 1} key={Artist.name + index} {...artist} />
  ))
}