export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== `${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}` || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})
  const slug = req.query.slug

  // Redirect to the path from the fetched post
  // res.redirect(`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`)
  res.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`)
}