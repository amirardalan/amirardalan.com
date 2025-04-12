import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPostBySlug } from '@/src/db/queries/posts';

// Image metadata
export const alt = 'Blog post';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Generate dynamic OG images for blog posts
export default async function Image({ params }: { params: { slug: string } }) {
  // Get the post data using the slug
  const post = await getPostBySlug(params.slug);

  // Load the font
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="flex h-full w-full items-center justify-center bg-zinc-900">
        <div tw="flex p-8">
          <div tw="flex flex-col w-full items-center justify-between p-8">
            {/* Blog title */}
            <h2 tw="flex flex-col text-[72px] text-white text-left font-bold mb-4 w-full">
              <span>{post?.title || 'Blog Post'}</span>
            </h2>

            {/* Blog excerpt */}
            <div tw="flex w-full">
              <h3 tw="text-3xl text-zinc-500 leading-tight mb-8">
                <span>{post?.excerpt || 'Read this post on amir.sh'}</span>
              </h3>
            </div>

            {/* Site branding */}
            <div tw="flex w-full items-center justify-between">
              <span tw="text-2xl text-zinc-400">amir.sh</span>
              <span tw="text-xl text-zinc-500">
                {post?.category ? `#${post.category}` : ''}
              </span>
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
