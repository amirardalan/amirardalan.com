import { getPostBySlug } from '@/db/queries/posts';
import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

export const alt = 'Blog post';
export { size, contentType };

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return generateTwitterImage({
    title: post?.title || 'Blog Post',
    description: post?.excerpt || 'Read this post on amir.sh',
    category: post?.category?.name || undefined,
  });
}
