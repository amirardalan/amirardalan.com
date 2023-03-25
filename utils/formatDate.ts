// Format Date - (eg: January 1, 2021)

const formatDate = (date: Date) => {
  const formatDate = new Date(date).toLocaleDateString('en-US', {
    timeZone: `${process.env.NEXT_PUBLIC_TIMEZONE}`,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formatDate;
};

export default formatDate;
