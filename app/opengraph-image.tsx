import {
  generateOgImage,
  size,
  contentType,
} from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Amir Ardalan';
export { size, contentType };

// Generate OG image for homepage
export default async function Image() {
  return generateOgImage({
    title: 'Amir Ardalan — amir.sh',
    description:
      'Fullstack Engineer & UI Designer with 10+ years of experience creating innovative digital solutions.',
  });
}
