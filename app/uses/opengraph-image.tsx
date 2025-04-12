import {
  generateOgImage,
  size,
  contentType,
} from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Amir Ardalan Uses';
export { size, contentType };

// Generate OG image for Uses page
export default async function Image() {
  return generateOgImage({
    title: 'Uses',
    description:
      'Software, hardware, and tools I use for development and design',
  });
}
