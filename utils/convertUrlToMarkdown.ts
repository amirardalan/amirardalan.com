// Convert an image URL to markdown (e.g. https://example.com/image.png -> ![Image](https://example.com/image.png)

export const convertUrlToMarkdown = (url: string): string => {
  const imageName = url
    .replace(/^.*\//, '')
    .split('_')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match: string) => match.toUpperCase());
  const altText = imageName;
  return `![${altText}](${url})`;
};
