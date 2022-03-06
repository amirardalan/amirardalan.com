import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Track from '@/components/Track'


export default function TopTracks() {
  
  const { data } = useSWR('/api/spotify/top-tracks', fetcher)

  if (!data) {
    return null
  }
  interface Track {
    ranking: number
    songUrl: string
    title: string
    artist: string
    album: string
    image: string
  }

  return data.tracks.map((track: Track, index: number) => (
    <Track ranking={index + 1} key={track.songUrl} {...track} />
  ))
}