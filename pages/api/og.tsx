import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const BarlowRegularFontP = fetch(
  new URL('@/public/fonts/Barlow-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const BarlowBoldFontP = fetch(
  new URL('@/public/fonts/Barlow-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  try {
    const [BarlowRegularFont, BarlowBoldFont] = await Promise.all([
      BarlowRegularFontP,
      BarlowBoldFontP,
    ]);

    const { searchParams } = new URL(req.url);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const displayUrl = siteUrl?.replace(/^https?:\/\//i, '');

    const image = searchParams.get('image') || `${siteUrl}/thumbnail.png`;
    const title = searchParams.get('title')?.slice(0, 100);
    const description = searchParams.get('description');

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col text-[#cecee6]">
          <div
            tw="h-full w-full absolute top-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
            }}
          />
          <div tw="h-full flex flex-col relative pr-90 justify-center align-start">
            <div tw="flex flex-col text-[5.8rem] font-bold pl-15 leading-[5.8rem]">
              {title}
              <div tw="flex text-[2.6rem] font-normal normal-case mt-10 leading-[2.5rem]">
                {description}
              </div>
            </div>
            <div tw="text-2xl uppercase font-light absolute bottom-12 right-15 text-right">
              {displayUrl}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        fonts: [
          {
            name: 'Barlow Web',
            data: BarlowRegularFont,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Barlow Web',
            data: BarlowBoldFont,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: unknown) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
