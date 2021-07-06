import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Track from '@/components/Track'


export default function TopTracks() {
  
  const { data } = useSWR('/api/spotify/top-tracks', fetcher)

  if (!data) {
    return null
  }

  return data.tracks.map((track: any, index: number) => (
    <Track ranking={index + 1} key={track.songUrl} {...track} />
  ))
}