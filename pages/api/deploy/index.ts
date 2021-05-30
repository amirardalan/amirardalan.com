// DEPLOY /api/deploy

export default async (req: any, res: any) => {

  if (req.query.secret !== `${process.env.NEXT_PUBLIC_DEPLOY_TOKEN}`) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  fetch("https://api.vercel.com/v1/integrations/deploy/prj_NfIWVqIhuOYXs9otAnkaVIe8Z3pl/qdTsNi6eoV")
  return res.json()
}