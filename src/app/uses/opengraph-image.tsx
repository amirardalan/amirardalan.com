import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Amir Ardalan Uses';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'Uses — Amir Ardalan',
    description:
      'Things I use to make things... hardware, software, and other tools.',
  });
}
