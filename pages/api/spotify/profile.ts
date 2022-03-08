import { NextApiRequest, NextApiResponse } from 'next'
import { getProfile } from '@/lib/spotify'


export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const response = await getProfile()
  const { items } = await response.json()

  console.log(items)

  const profile = items.slice(0, 20).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
    album: track.album.name
  }))

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  )

  return res.status(200).json({ profile })
}