import { db } from '@/db';
import { posts } from '@/schema';
import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import { cache } from 'react';
import BlogPosts from '@/components/blog/BlogPosts';
import { eq } from 'drizzle-orm';

// Disable revalidation for static caching
export const revalidate = false;

// Cache the fetch logic to ensure static behavior
const getCachedPosts = cache(async () => {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(posts.created_at, 'desc');
});

export default async function Blog() {
  const posts = await getCachedPosts();

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
