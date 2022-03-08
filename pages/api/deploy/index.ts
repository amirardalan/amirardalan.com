// DEPLOY /api/deploy
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const url = `${process.env.DEPLOY_HOOK}`

  if (req.query.secret !== `${process.env.NEXT_PUBLIC_DEPLOY_TOKEN}`) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  await fetch(url)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}