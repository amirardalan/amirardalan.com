import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
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
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    const metaTitle = process.env.NEXT_PUBLIC_META_TITLE;
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : metaTitle;
    const image = searchParams.get('image') || `${url}/thumbnail.jpg`;

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col justify-center items-center bg-gray-50 p-20">
          <p tw="text-7xl font-bold">{title}</p>
          <p tw="text-7xl font-light">{url}</p>
          <img
            style={{ objectFit: 'cover' }}
            tw="absolute top-0"
            src={image}
            height="627"
            width="1200"
          />
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
