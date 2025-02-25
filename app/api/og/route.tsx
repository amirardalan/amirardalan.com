import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div className="flex h-full w-full items-center justify-center bg-white p-12 text-center text-4xl text-black">
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
