import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher)

  return (
      <div>
        {data?.songUrl ? (
        <>
          <div>
            <Image
              src={data.albumImageUrl}
              height="200"
              width="200"
              alt={data.title}
            />
          </div>
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        </>
      ) : (
        <p>
          Not Playing
        </p>
      )}
      <span>
        {' – '}
      </span>
      <p>
        {data?.artist ?? 'Spotify'}
      </p>
    </div>
  )
}