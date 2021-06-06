// Calculate estimated read time of "content"
const ReadTime: React.FC<{ content: any }> = ({ content }) => {
  const text: string = content
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  const readTime = time + ' ' + 'min read'
  return readTime as any
}

export default ReadTime