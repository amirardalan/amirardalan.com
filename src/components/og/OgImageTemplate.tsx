import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export interface OgImageProps {
  title: string;
  description: string;
  tag?: string;
}

// Export common metadata for OG images
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateOgImage({
  title,
  description,
  tag,
}: OgImageProps) {
  // Load self-hosted font
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-zinc-900">
        <div tw="flex p-8">
          <div tw="flex flex-col w-full items-center justify-start p-8">
            {/* Site branding */}
            <div tw="flex w-full items-center justify-between">
              <span tw="text-3xl text-zinc-400">amir.sh</span>
              {tag && (
                <span tw="text-3xl text-zinc-500 text-[#00FBFF]">#{tag}</span>
              )}
            </div>

            <div tw="flex flex-col mt-12">
              <h2 tw="flex flex-col text-7xl text-white text-left font-bold mt-4 w-full leading-none">
                <span>{title}</span>
              </h2>
              <h3 tw="w-full text-5xl text-zinc-500 leading-none">
                <span>{description}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
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
