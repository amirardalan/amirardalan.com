// Format Date - (eg: January 1, 2021)
const FormatDate = (date: Date) => {
  const formatDate = new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  
  return formatDate
}

export default FormatDate