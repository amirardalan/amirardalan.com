import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const alt = 'Amir Ardalan';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  const dmSerif = await readFile(
    join(process.cwd(), 'public/fonts/dm-serif-text-v12-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div className="flex h-full w-full items-center justify-center bg-zinc-950">
        <div tw="flex p-8">
          <div tw="flex flex-col md:flex-row w-full md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-[124px] text-white text-left">
              <span>Site</span>
            </h2>
            <div tw="w-132 ml-6 flex">
              <h3 tw="text-4xl text-zinc-500 leading-10">
                <span>
                  A Next.js App Router starter project with TypeScript,
                  Tailwind, NextAuth, Prettier, and Dark Mode.
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'DM Serif Text',
          data: dmSerif,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
