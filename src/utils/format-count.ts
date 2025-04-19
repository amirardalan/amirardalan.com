/**
 * Formats a number into a shorter string representation (e.g., 1K, 1.5M).
 * Uses toLocaleString for numbers less than 1000.
 * @param count The number to format.
 * @returns The formatted string.
 */
export const formatCount = (count: number): string => {
  if (count >= 1000000) {
    // Show one decimal place only if the number is less than 10M
    return `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`;
  } else if (count >= 1000) {
    // Show one decimal place only if the number is less than 10K
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`;
  }
  // Use locale string for better readability of large numbers below 1000
  return count.toLocaleString();
};
