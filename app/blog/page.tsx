import { cache } from 'react';

import { db } from '@/db/connector';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import BlogPosts from '@/components/blog/BlogPosts';
import { BlogPost } from '@/types/blog';

// Cache the posts fetch to improve performance and tag for revalidation
const getCachedPosts = cache(async () => {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.created_at));
});

// Setting revalidate to false for on-demand revalidation only
export const revalidate = false;

// Add tag-based revalidation support
export const generateMetadata = () => {
  return {
    title: 'Blog — Amir Ardalan',
    description: 'Articles on web development, design, and technology',
    alternates: {
      canonical: '/blog',
    },
  };
};

export default async function Blog() {
  // Get posts with cached function for better performance
  const posts: BlogPost[] = await getCachedPosts();

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title="Blog" />
        <div className="text-dark dark:text-light">
          <BlogPosts posts={posts} />
        </div>
      </div>
    </Container>
  );
}
