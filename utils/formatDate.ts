// Format Date - (eg: January 1, 2021)

const formatDate = (date: Date, format?: 'long' | 'numeric') => {
  const formatMonth = format || 'long'; // default value is 'long'
  const formatDate = new Date(date).toLocaleDateString('en-US', {
    timeZone: `${process.env.NEXT_PUBLIC_TIMEZONE}`,
    month: formatMonth,
    day: 'numeric',
    year: 'numeric',
  });

  return formatDate;
};

export default formatDate;
