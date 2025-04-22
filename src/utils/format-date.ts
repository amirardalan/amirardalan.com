export function formatDate(
  date: Date | string,
  format: 'long' | 'short' = 'long'
): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: format,
    day: 'numeric',
    year: 'numeric',
  });
}
