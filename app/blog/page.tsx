import { cache } from 'react';

import { db } from '@/db/connector';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import BlogPosts from '@/components/blog/BlogPosts';
import { BlogPost } from '@/types/blog';

// Cache the posts fetch to improve performance
const getCachedPosts = cache(async () => {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.created_at));
});

// Add export for revalidation timing
export const revalidate = false; // Use false to rely only on on-demand revalidation

export default async function Blog() {
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
