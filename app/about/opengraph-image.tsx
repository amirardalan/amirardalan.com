import { generateOgImage } from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'About Amir Ardalan';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Generate OG image for About page
export default async function Image() {
  return generateOgImage({
    title: 'About Me',
    description: 'Engineer, Designer & Creator',
  });
}
