import { getCloudinaryImages } from '@/lib/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch images from cloudinary 'Blog' Asset Folder
    const images = await getCloudinaryImages('blog');
    return NextResponse.json({
      resources: images,
    });
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'blog' },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: (uploadResult as any).secure_url });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to upload file to Cloudinary.' },
      { status: 500 }
    );
  }
}
