import { getPostBySlug } from '@/src/db/queries/posts';
import {
  generateOgImage,
  size,
  contentType,
} from '@/src/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Blog post';
export { size, contentType };

// Generate dynamic OG images for blog posts
export default async function Image({ params }: { params: { slug: string } }) {
  // Get the post data using the slug
  const post = await getPostBySlug(params.slug);

  return generateOgImage({
    title: post?.title || 'Blog Post',
    description: post?.excerpt || 'Read this post on amir.sh',
    tag: post?.category || undefined,
  });
}
