import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.query.secret !== `${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.unstable_revalidate(`${req.query.path}`)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};