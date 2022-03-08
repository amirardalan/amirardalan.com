import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Track from '@/components/Track'


export default function Profile() {
  
  const { data } = useSWR('/api/spotify/profile', fetcher)

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

  return (
    <div>This is where the profile will go</div>
  )
}