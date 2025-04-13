import { generateTwitterImage } from '@/src/components/og/TwitterImageTemplate';
import { size, contentType } from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Amir Ardalan Uses';
export { size, contentType };

// Generate Twitter image for Uses page
export default async function Image() {
  return generateTwitterImage({
    title: 'Uses',
    description:
      'Software, hardware, and tools I use for development and design',
  });
}
