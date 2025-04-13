import {
  generateOgImage,
  size,
  contentType,
  OgImageProps,
} from './OgImageTemplate';

// Twitter uses the same OG image generation, but we need to export a dedicated file for it
export async function generateTwitterImage(props: OgImageProps) {
  return generateOgImage(props);
}
