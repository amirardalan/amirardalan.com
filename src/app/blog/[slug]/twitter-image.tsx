import { getPostBySlug } from '@/db/queries/posts';
import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Blog post';
export { size, contentType };

// Generate dynamic Twitter images for blog posts
export default async function Image({ params }: { params: { slug: string } }) {
  // Get the post data using the slug
  const post = await getPostBySlug(params.slug);

  return generateTwitterImage({
    title: post?.title || 'Blog Post',
    description: post?.excerpt || 'Read this post on amir.sh',
    tag: post?.category?.name || undefined,
  });
}
