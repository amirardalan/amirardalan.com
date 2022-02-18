// Format Date - (eg: January 1, 2021)
const FormatDate = (date: String) => {
  const dateObj = new Date(date.slice(0, 10))
  const formatDate = [
    dateObj.toLocaleDateString("en-US", { month: 'long' })+' '+
    dateObj.toLocaleDateString("en-US", { day: 'numeric' })+', '+
    dateObj.toLocaleDateString("en-US", { year: 'numeric' })
  ]
  
  const postDate = formatDate.toString()
  return postDate as String
}

export default FormatDate