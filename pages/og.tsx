import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const titilliumLightFontP = fetch(
  new URL('@/public/fonts/Titillium-Light.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const titilliumBoldFontP = fetch(
  new URL('@/public/fonts/Titillium-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  try {
    const [titilliumLightFont, titilliumBoldFont] = await Promise.all([
      titilliumLightFontP,
      titilliumBoldFontP,
    ]);

    const { searchParams } = new URL(req.url);

    // dynamic params
    const metaTitle = process.env.NEXT_PUBLIC_META_TITLE || '';
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    const image = searchParams.get('image') || `${url}/thumbnail.png`;
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : metaTitle;
    const description =
      searchParams.has('description') ||
      process.env.NEXT_PUBLIC_META_DESCRIPTION;

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
          <div tw="h-full flex flex-col relative pr-80 justify-center">
            <div tw="flex flex-col text-8xl font-bold pl-20 leading-[5rem]">
              {title}
              <div tw="flex text-4xl font-light mt-10 leading-[2.2rem]">
                {description}
              </div>
            </div>
            <div tw="text-2xl font-light absolute bottom-12 right-20 text-right">
              {url}
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
            data: titilliumLightFont,
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
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log(`An unknown error occurred: ${e}`);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
