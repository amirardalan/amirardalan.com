import { cache } from 'react';

import { db } from '@/db/connector';
import { posts } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import BlogPosts from '@/components/blog/BlogPosts';
import { BlogPost } from '@/types/blog';

// Disable revalidation for static caching
export const revalidate = false;

// Cache the fetch logic to ensure static behavior
const getCachedPosts = cache(async () => {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.created_at)); // Ensure created_at is correctly handled
});

export default async function Blog() {
  // Fetch posts from the database
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
