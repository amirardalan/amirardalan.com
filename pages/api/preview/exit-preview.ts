// EXIT PREVIEW MODE /api/preview/exit-preview
export default async (_, res) => {
  res.clearPreviewData()

  res.writeHead(307, { Location: "/" })
  res.end()
}