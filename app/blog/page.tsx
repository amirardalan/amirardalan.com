import { getPublishedPosts } from '@/db/queries/posts';

import Container from '@/components/content/Container';
import PageHeading from '@/components/ui/PageHeading';
import BlogPosts from '@/components/blog/BlogPosts';

import { BlogPost } from '@/types/blog';

// Setting revalidate to false for on-demand revalidation only
export const revalidate = false;

// Add tag-based revalidation support
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
    posts = await getPublishedPosts();
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
