// EXIT PREVIEW MODE /api/preview/exit-preview
export default async (req: any, res: any) => {

  if (req.query.secret !== `${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}`) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  res.clearPreviewData()
  res.writeHead(307, { Location: "/" })
  res.end()
}