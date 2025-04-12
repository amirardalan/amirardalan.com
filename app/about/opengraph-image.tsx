import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const alt = 'About Amir Ardalan';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="flex h-full w-full items-center justify-center bg-zinc-900">
        <div tw="flex p-8">
          <div tw="flex flex-col w-full items-center justify-between p-8">
            <h2 tw="flex flex-col text-[80px] text-white text-left font-bold">
              <span>About Me</span>
            </h2>
            <div tw="flex w-full mt-6">
              <h3 tw="text-3xl text-zinc-500 leading-snug">
                <span>Engineer, Designer & Creator</span>
              </h3>
            </div>
            <div tw="flex w-full items-center justify-between mt-8">
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
