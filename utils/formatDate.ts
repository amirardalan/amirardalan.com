// Format Date - (eg: January 1, 2021)
const FormatDate = (date: Date) => {
  const formatDate = [
    date.toLocaleDateString("en-US", { month: 'long' }) ,
    date.toLocaleDateString("en-US", { day: 'numeric' })+',',
    date.toLocaleDateString("en-US", { year: 'numeric' })
  ]
  const postDate = formatDate.join(' ')
  return postDate as any
}

export default FormatDate