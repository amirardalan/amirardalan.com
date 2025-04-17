import { db } from '@/db/connector';
import { categories } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Category } from '@/types/blog';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      created_at: categories.created_at,
      updated_at: categories.updated_at,
    })
    .from(categories)
    .orderBy(desc(categories.created_at));
}

// Get category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
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
}
