import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const SairaRegularFontP = fetch(
  new URL('@/public/fonts/Saira-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  try {
    const [SairaRegularFont] = await Promise.all([
      SairaRegularFontP,
    ]);

    const { searchParams } = new URL(req.url);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const displayUrl = 'https://amir.sh'

    const image = searchParams.get('image') || `${siteUrl}/thumbnail.png`;
    const title = searchParams.get('title')?.slice(0, 100);
    const description = searchParams.get('description');

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col text-[#edf1f5]">
          <div
            tw="h-full w-full absolute top-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
            }}
          />
          <div tw="h-full flex flex-col relative pr-90 justify-center">
            <div tw="flex flex-col text-[4.2rem] pl-15 leading-[3.2rem]">
              {title}
              <div tw="flex text-[2.2rem] text-[#9f9eac] font-normal normal-case mt-8 leading-[2rem]">
                {description}
              </div>
            </div>
            <div tw="text-2xl text-[#9f9eac] uppercase font-light absolute bottom-20 right-15 text-right">
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
            name: 'Saira',
            data: SairaRegularFont,
            style: 'normal',
            weight: 400,
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
