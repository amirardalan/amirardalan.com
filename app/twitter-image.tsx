import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Amir Ardalan';
export { size, contentType };

// Generate Twitter image for homepage
export default async function Image() {
  return generateTwitterImage({
    title: 'Amir Ardalan — amir.sh',
    description:
      'Fullstack Engineer & UI Designer with 10+ years of experience creating innovative digital solutions.',
  });
}
