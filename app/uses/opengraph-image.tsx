import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const alt = 'Amir Ardalan Uses';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Load the font
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="flex h-full w-full items-center justify-center bg-zinc-900">
        <div tw="flex p-8">
          <div tw="flex flex-col w-full items-center justify-between p-8">
            {/* Page title */}
            <h2 tw="flex flex-col text-[80px] text-white text-left font-bold mb-4 w-full">
              <span>Uses</span>
            </h2>

            {/* Page description */}
            <div tw="flex w-full">
              <h3 tw="text-3xl text-zinc-500 leading-tight mb-8">
                <span>
                  Software, hardware, and tools I use for development and design
                </span>
              </h3>
            </div>

            {/* Site branding */}
            <div tw="flex w-full items-center justify-between">
              <span tw="text-2xl text-zinc-400">amir.sh</span>
            </div>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
      fonts: [
        {
          name: 'Jura',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
