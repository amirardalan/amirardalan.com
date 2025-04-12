import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { size, contentType } from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Amir Ardalan';
export { size, contentType };

// Image generation
export default async function Image() {
  const dmSerif = await readFile(
    join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="flex h-full w-full items-center justify-center bg-zinc-900">
        <div tw="flex p-8">
          <div tw="flex flex-col md:flex-row w-full md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-[124px] text-white text-left">
              <span>amir.sh</span>
            </h2>
            <div tw="flex w-132 ml-6">
              <h3 tw="text-4xl text-zinc-500 leading-10">
                <span>
                  A Markdown blog and CMS written in TypeScript using Next.js
                  App Router. Publish and edit blog posts without a build using
                  On-demand Revalidation.
                </span>
              </h3>
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
          name: 'DM Serif Text',
          data: dmSerif,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
