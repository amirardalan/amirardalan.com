import { cache } from 'react';
import { db } from '@/db/connector';
import { posts, users } from '@/db/schema';
import { eq, desc, lt, gt, and } from 'drizzle-orm';
import { BlogPost } from '@/types/blog';

// Get all published posts (for blog page)
export const getPublishedPosts = cache(async () => {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.created_at));
});

// Get draft posts (for admin drafts page)
export async function getDraftPosts() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      updated_at: posts.updated_at,
      user_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
    .where(eq(posts.published, false))
    .orderBy(desc(posts.updated_at));
}

// Get a post by slug (for blog/[slug] page)
export async function getPostBySlug(slug: string) {
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      excerpt: posts.excerpt,
      slug: posts.slug,
      category: posts.category,
      published: posts.published,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      show_updated: posts.show_updated,
      user_id: posts.user_id,
      author_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  return post.length ? post[0] : null;
}

// Get all slugs (for generateStaticParams)
export async function getAllPublishedSlugs() {
  const publishedPosts = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.published, true));

  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Create a new post
export async function createPost(postData: Omit<BlogPost, 'id'>) {
  const result = await db
    .insert(posts)
    .values({
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      category: postData.category || null,
      user_id: postData.user_id,
      published: postData.published || false,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning({ id: posts.id });

  return result[0]?.id;
}

// Update an existing post
export async function updatePost(id: number, postData: Partial<BlogPost>) {
  // Get the original post to check if publish status changed
  const originalPost = await db
    .select({ published: posts.published, slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  const wasPublished = originalPost[0]?.published;
  const oldSlug = originalPost[0]?.slug;

  await db
    .update(posts)
    .set({
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      category: postData.category,
      published: postData.published,
      updated_at: new Date(),
    })
    .where(eq(posts.id, id));

  return {
    wasPublished,
    oldSlug,
    newSlug: postData.slug,
    publishStatusChanged: wasPublished !== postData.published,
  };
}

// Delete a post
export async function deletePost(id: number) {
  // Get the post slug before deletion for revalidation
  const post = await db
    .select({ slug: posts.slug, published: posts.published })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!post.length) {
    throw new Error('Post not found');
  }

  const slug = post[0].slug;
  const wasPublished = post[0].published;

  // Delete the post
  await db.delete(posts).where(eq(posts.id, id));

  return {
    slug,
    wasPublished,
  };
}

// Get adjacent posts (previous and next)
export async function getAdjacentPosts(slug: string) {
  const currentPost = await db
    .select({ created_at: posts.created_at })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!currentPost.length) {
    return { previous: null, next: null };
  }

  const currentDate = currentPost[0].created_at;

  // Get previous post (newer)
  const previousPost = await db
    .select({
      title: posts.title,
      slug: posts.slug,
    })
    .from(posts)
    .where(and(eq(posts.published, true), gt(posts.created_at, currentDate)))
    .orderBy(posts.created_at)
    .limit(1);

  // Get next post (older)
  const nextPost = await db
    .select({
      title: posts.title,
      slug: posts.slug,
    })
    .from(posts)
    .where(and(eq(posts.published, true), lt(posts.created_at, currentDate)))
    .orderBy(desc(posts.created_at))
    .limit(1);

  return {
    previous: previousPost.length ? previousPost[0] : null,
    next: nextPost.length ? nextPost[0] : null,
  };
}
