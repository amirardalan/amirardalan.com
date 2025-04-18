import 'server-only'; // Mark this file as server-only
import { db } from '@/db/connector';
import { categories, posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Category } from '@/types/blog';

export async function getCategories(): Promise<Category[]> {
  try {
    return await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        created_at: categories.created_at,
        updated_at: categories.updated_at,
      })
      .from(categories)
      .orderBy(desc(categories.created_at));
  } catch (error) {
    console.error('Database error in getCategories:', error);
    throw error;
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        created_at: categories.created_at,
        updated_at: categories.updated_at,
      })
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    return result.length ? result[0] : null;
  } catch (error) {
    console.error('Database error in getCategoryBySlug:', error);
    throw error;
  }
}

export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        created_at: categories.created_at,
        updated_at: categories.updated_at,
      })
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    return result.length ? result[0] : null;
  } catch (error) {
    console.error('Database error in getCategoryById:', error);
    throw error;
  }
}

export async function isCategoryUsedByPosts(id: number): Promise<boolean> {
  try {
    const result = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.category_id, id))
      .limit(1);

    return result.length > 0;
  } catch (error) {
    console.error('Database error in isCategoryUsedByPosts:', error);
    throw error;
  }
}
