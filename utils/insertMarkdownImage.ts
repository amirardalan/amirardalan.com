interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

type HandleInsertImage = (markdownUrl: string) => void;

const insertMarkdownImage = (
  response: CloudinaryResponse | string | any[],
  handleInsertImage: HandleInsertImage
) => {
  let imageUrl;
  if (Array.isArray(response)) {
    imageUrl = response[0];
  } else if (typeof response === 'string') {
    imageUrl = response;
  } else {
    imageUrl = response.secure_url;
  }

  const imageName = imageUrl
    .replace(/^.*\//, '')
    .split('_')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match: string) => match.toUpperCase());
  const altText = imageName;
  const markdownUrl = `![${altText}](${imageUrl})`;

  handleInsertImage(markdownUrl);
  return markdownUrl;
};

export default insertMarkdownImage;
