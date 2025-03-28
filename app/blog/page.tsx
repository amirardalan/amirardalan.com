import { cache } from 'react';

import { db } from '@/app/db/connector';
import { posts } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import BlogPosts from '@/components/blog/BlogPosts';

type BlogPost = {
  id: number;
  authorId: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  showUpdated: boolean | null;
  category: string | null;
  slug: string | null;
};

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
  const posts = (await getCachedPosts()).map(
    (post): BlogPost => ({
      ...post,
      content: post.content ?? '', // Ensure content is always a string
      updated_at: post.updated_at
        ? post.updated_at.toISOString()
        : post.created_at.toISOString(),
    })
  );

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
