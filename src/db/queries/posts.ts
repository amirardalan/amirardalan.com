import { db } from '@/db/connector';
import { posts, users, categories } from '@/db/schema';
import { eq, desc, lt, gt, and, count } from 'drizzle-orm'; // Import count

import { BlogPost } from '@/types/blog';

// Get all published posts (for blog page)
export const getPublishedPosts = async (options?: {
  next?: { tags: string[] };
}) => {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      excerpt: posts.excerpt,
      category_id: posts.category_id,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
      published: posts.published,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      show_updated: posts.show_updated,
      user_id: posts.user_id,
      user_name: users.name,
      featured: posts.featured,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
    .leftJoin(categories, eq(posts.category_id, categories.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.created_at))
    .execute(options);
};

// Get draft posts (for admin drafts page)
export async function getDraftPosts() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      excerpt: posts.excerpt,
      category_id: posts.category_id,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
      published: posts.published,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      show_updated: posts.show_updated,
      user_id: posts.user_id,
      user_name: users.name,
      featured: posts.featured,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
    .leftJoin(categories, eq(posts.category_id, categories.id))
    .where(eq(posts.published, false))
    .orderBy(desc(posts.updated_at));
}

// Get a post by slug (for blog/[slug] page)
export async function getPostBySlug(
  slug: string,
  options?: { next?: { tags: string[] } }
) {
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      excerpt: posts.excerpt,
      slug: posts.slug,
      category_id: posts.category_id,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
      published: posts.published,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      show_updated: posts.show_updated,
      user_id: posts.user_id,
      author_name: users.name,
      featured: posts.featured,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
    .leftJoin(categories, eq(posts.category_id, categories.id))
    .where(eq(posts.slug, slug))
    .limit(1)
    .execute(options);

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

// Get posts by category ID
export async function getPostsByCategoryId(categoryId: number) {
  return db
    .select({
      id: posts.id,
      slug: posts.slug,
      published: posts.published,
    })
    .from(posts)
    .where(eq(posts.category_id, categoryId));
}

// Get count of published posts
export async function getPublishedPostsCount() {
  const result = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.published, true));
  return result[0]?.count ?? 0;
}

// Get count of draft posts
export async function getDraftPostsCount() {
  const result = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.published, false));
  return result[0]?.count ?? 0;
}

// Get Post Title and Slug by ID
export async function getPostTitleSlugById(id: number) {
  const result = await db
    .select({
      title: posts.title,
      slug: posts.slug,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  return result.length ? result[0] : null;
}

// Get Post Title and Slug by Slug
export async function getPostTitleSlugBySlug(slug: string) {
  const result = await db
    .select({
      title: posts.title,
      slug: posts.slug, // Include slug for consistency, though we already have it
    })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return result.length ? result[0] : null;
}

// Database operation to create a new post
export async function dbCreatePost(postData: Omit<BlogPost, 'id'>) {
  const result = await db
    .insert(posts)
    .values({
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      category_id: postData.category_id ?? null, // <-- use category_id
      user_id: postData.user_id,
      published: postData.published || false,
      featured: postData.featured || false,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning({ id: posts.id });

  return result[0]?.id;
}

// Database operation to update an existing post
export async function dbUpdatePost(id: number, postData: Partial<BlogPost>) {
  // Get the original post to check if publish status changed
  const originalPost = await db
    .select({ published: posts.published, slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  const wasPublished = originalPost[0]?.published;
  const oldSlug = originalPost[0]?.slug;

  // If this post is being featured, unfeatured all other posts first
  if (postData.featured === true) {
    await db
      .update(posts)
      .set({ featured: false })
      .where(eq(posts.featured, true));
  }

  // Prepare the update object with proper handling of category_id
  const updateObject: any = {
    title: postData.title,
    slug: postData.slug,
    excerpt: postData.excerpt,
    content: postData.content,
    published: postData.published,
    show_updated: postData.show_updated ?? false,
    updated_at: new Date(),
    featured: postData.featured,
  };

  // Only include category_id if it's part of the update data
  // This ensures we don't overwrite it with null unless that's the intent
  if ('category_id' in postData) {
    updateObject.category_id = postData.category_id;
  }

  await db.update(posts).set(updateObject).where(eq(posts.id, id));

  return {
    wasPublished,
    oldSlug,
    newSlug: postData.slug,
    publishStatusChanged: wasPublished !== postData.published,
  };
}

// Database operation to delete a post
export async function dbDeletePost(id: number) {
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
