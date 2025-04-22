export function formatDate(
  date: Date | string,
  length: 'long' | 'short' = 'long'
): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: length,
    day: 'numeric',
    year: 'numeric',
  });
}
