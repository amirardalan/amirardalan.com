export function formatImage(
  url: string,
  alt = '',
  caption = '',
  priority = false
): string {
  return `<Figure src="${url}" alt="${alt}" caption="${caption}"${priority ? ' priority' : ''} />`;
}
