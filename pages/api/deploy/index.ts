// DEPLOY /api/deploy
export default async (req: any, res: any) => {

  if (req.query.secret !== `${process.env.NEXT_PUBLIC_DEPLOY_TOKEN}`) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // const buildHookUrl = process.env.DEPLOY_HOOK

  // await fetch(buildHookUrl, {
  //   method: 'POST',
  //   mode: 'cors',
  //   cache: 'no-cache',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // })
  
  console.log(res)
  res.json()
}