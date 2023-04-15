export const convertUrlToMarkdown = (url: string): string => {
  const imageName = url
    .replace(/^.*\//, '')
    .split('_')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match: string) => match.toUpperCase());
  const altText = imageName;
  return `![${altText}](${url})`;
};
