interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

interface ImageMetadata {
  imageName: string;
  altText: string;
  markdownUrl: string;
}

const convertImgToMd = (response: CloudinaryResponse): ImageMetadata => {
  const { secure_url, public_id } = response;
  const imageName = public_id
    .replace(/^.*\//, '')
    .split('_')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match: string) => match.toUpperCase());
  const altText = imageName;
  const markdownUrl = `![${altText}](${secure_url})`;
  return { imageName, altText, markdownUrl };
};

export default convertImgToMd;
