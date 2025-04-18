import { getAllPublishedSlugs, getPostBySlug } from '@/db/queries/posts';
import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

// Image metadata
export const alt = 'Blog post';
export { size, contentType };

// Generate static params for all published posts
export async function generateStaticParams() {
  const posts = await getAllPublishedSlugs();
  return posts;
}

// Generate dynamic OG images for blog posts
export default async function Image({ params }: { params: { slug: string } }) {
  try {
    // Get the post data using the slug
    const post = await getPostBySlug(params.slug);

    if (!post) {
      // Fallback for missing post data
      return generateOgImage({
        title: 'Blog Post',
        description: 'Read this post on amir.sh',
        tag: undefined,
      });
    }

    return generateOgImage({
      title: post.title,
      description: post.excerpt || 'Read this post on amir.sh',
      tag: post.category?.name || undefined,
    });
  } catch (error) {
    console.error('Error generating OG image:', error);

    // Provide a fallback image in case of errors
    return generateOgImage({
      title: 'Blog Post',
      description: 'Read this post on amir.sh',
      tag: undefined,
    });
  }
}
