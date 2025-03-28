import { db } from '@/app/db/db';
import { posts } from '@/app/db/schema';
import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import { cache } from 'react';
import BlogPosts from '@/components/blog/BlogPosts';
import { eq, desc } from 'drizzle-orm';

// Disable revalidation for static caching
export const revalidate = false;

// Cache the fetch logic to ensure static behavior
const getCachedPosts = cache(async () => {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.created_at));
});

export default async function Blog() {
  const posts = (await getCachedPosts()).map((post) => ({
    ...post,
    editedAt: post.updated_at
      ? post.updated_at.toISOString()
      : post.created_at.toISOString(),
  }));

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
