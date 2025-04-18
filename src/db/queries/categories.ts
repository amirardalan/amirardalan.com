import 'server-only'; // Mark this file as server-only
import { db } from '@/db/connector';
import { categories } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Category } from '@/types/blog';

// Get all categories
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

// Get category by slug
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

// Get category by ID
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
