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

export default async function handler() {
  try {
    const [titilliumLightFont, titilliumBoldFont] = await Promise.all([
      titilliumLightFontP,
      titilliumBoldFontP,
    ]);

    const boldText = 'Amir Ardalan';
    const lightText = 'Cool dude.';

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col justify-center items-center bg-gray-50 p-20">
          <p tw="text-7xl font-bold">{boldText}</p>
          <p tw="text-7xl font-Light">{lightText}</p>
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
