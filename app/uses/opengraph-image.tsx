import { generateOgImage } from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Amir Ardalan Uses';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Generate OG image for Uses page
export default async function Image() {
  return generateOgImage({
    title: 'Uses',
    description:
      'Software, hardware, and tools I use for development and design',
  });
}
