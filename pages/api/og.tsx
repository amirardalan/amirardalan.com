import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const titilliumRegularFontP = fetch(
  new URL('@/public/fonts/Titillium-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const titilliumBoldFontP = fetch(
  new URL('@/public/fonts/Titillium-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  try {
    const [titilliumRegularFont, titilliumBoldFont] = await Promise.all([
      titilliumRegularFontP,
      titilliumBoldFontP,
    ]);

    const { searchParams } = new URL(req.url);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const displayUrl = siteUrl?.replace(/^https?:\/\//i, '');

    const image = searchParams.get('image') || `${siteUrl}/thumbnail.png`;
    const title = searchParams.get('title')?.slice(0, 100);
    const description = searchParams.get('description');

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col text-[#e4e9f8]">
          <div
            tw="h-full w-full absolute top-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
            }}
          />
          <div tw="h-full flex flex-col relative pr-90 justify-center">
            <div tw="flex flex-col text-[5.5rem] font-bold pl-20 leading-[4.8rem]">
              {title}
              <div tw="flex text-4xl font-normal mt-10 leading-[2.5rem]">
                {description}
              </div>
            </div>
            <div tw="border-t-2 border-[#634da5] text-4xl font-light absolute bottom-12 right-20 text-right">
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
            name: 'Titillium Web',
            data: titilliumRegularFont,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Titillium Web',
            data: titilliumBoldFont,
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
