import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'Amir Ardalan — amir.sh',
    description:
      'Frontend Engineer & UI/UX Designer with 10+ years of experience creating innovative digital solutions.',
  });
}
