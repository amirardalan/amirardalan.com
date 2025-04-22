import { getAllPublishedSlugs, getPostBySlug } from '@/db/queries/posts';
import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Blog post';
export { size, contentType };

export async function generateStaticParams() {
  const posts = await getAllPublishedSlugs();
  return posts;
}

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return generateOgImage({
        title: 'Blog Post',
        description: 'Read this post on amir.sh',
      });
    }

    return generateOgImage({
      title: post.title,
      description: post.excerpt || 'Read this post on amir.sh',
      category: post.category?.name || undefined,
    });
  } catch (error) {
    console.error('Error generating OG image:', error);

    // Fallback OG
    return generateOgImage({
      title: 'Blog — amir.sh',
      description: 'Read this post on amir.sh',
    });
  }
}
