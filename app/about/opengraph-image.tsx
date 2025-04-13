import {
  generateOgImage,
  size,
  contentType,
} from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'About Amir Ardalan';
export { size, contentType };

// Generate OG image for About page
export default async function Image() {
  return generateOgImage({
    title: 'About Me',
    description: 'Engineer, Designer & Creator',
  });
}
