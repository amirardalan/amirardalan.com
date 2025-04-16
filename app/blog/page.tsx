import { getPublishedPosts } from '@/db/queries/posts';

import Container from '@/components/content/Container';
import PageHeading from '@/components/ui/PageHeading';
import BlogPosts from '@/components/blog/BlogPosts';

import { BlogPost } from '@/types/blog';

export const generateMetadata = () => {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Blog — Amir Ardalan',
    description: 'Articles on web development, design, and technology',
    alternates: {
      canonical: '/blog',
    },
  };
};

export default async function Blog() {
  let posts: BlogPost[] = [];
  try {
    posts = await getPublishedPosts({
      next: { tags: ['blog-list'] }, // Tag for on-demand revalidation
    });
  } catch (error) {
    console.error('Error fetching published posts:', error);
  }

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title="Blog" />
        <div className="text-dark dark:text-light">
          {posts.length > 0 ? (
            <BlogPosts posts={posts} />
          ) : (
            <p>No blog posts available at the moment.</p>
          )}
        </div>
      </div>
    </Container>
  );
}
