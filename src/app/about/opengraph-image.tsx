import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'About Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'About — Amir Ardalan',
    description:
      'Frontend Engineer & UI Designer with 10+ years of experience creating innovative digital solutions.',
  });
}
