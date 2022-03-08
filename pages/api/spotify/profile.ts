import { NextApiRequest, NextApiResponse } from 'next'
import { getProfile } from '@/lib/spotify'


export default async function handler(_:NextApiRequest, res:NextApiResponse) {
  const response = await getProfile()

  const profile = await response.json()
  
  
  const id = profile.id
  const name = profile.display_name
  const followers = profile.followers.total
  const image = profile.images[0].url

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  )

  return res.status(200).json({
    id,
    name,
    followers,
    image,
  })
}