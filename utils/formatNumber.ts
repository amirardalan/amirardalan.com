// Format Number Count - (eg: 1.2K, 2M)

const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    const numStr = (num / 1000).toFixed(num % 1000 >= 100 ? 1 : 0);
    return numStr.endsWith('.0') ? numStr.slice(0, -2) + 'K' : numStr + 'K';
  } else {
    const numStr = (num / 1000000).toFixed(1);
    return numStr.endsWith('.0') ? numStr.slice(0, -2) + 'M' : numStr + 'M';
  }
};

export default formatNumber;
