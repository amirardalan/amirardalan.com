import { generateOgImage, OgImageProps } from '@/components/og/OgImageTemplate';

export async function generateTwitterImage(props: OgImageProps) {
  return generateOgImage(props);
}
