import { getCloudinaryImages } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const images = await getCloudinaryImages('blog'); // Fetch images from the 'blog' folder
    return NextResponse.json({
      resources: images, // Ensure the response includes a 'resources' property
    });
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary.' },
      { status: 500 }
    );
  }
}
