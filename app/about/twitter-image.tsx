import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

// Image metadata
export const alt = 'About Amir Ardalan';
export { size, contentType };

// Generate Twitter image for About page
export default async function Image() {
  return generateTwitterImage({
    title: 'About Me',
    description: 'Engineer, Designer & Creator',
  });
}
