import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/db/queries/categories';
import { db } from '@/db/connector';
import { categories } from '@/db/schema';

// Get all categories
export async function GET() {
  try {
    const result = await getCategories();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// Create a new category
export async function POST(request: NextRequest) {
  try {
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Insert the new category
    const [result] = await db
      .insert(categories)
      .values({
        name,
        slug,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);

    // Check for duplicate slug error
    if (error.message?.includes('categories_slug_unique')) {
      return NextResponse.json(
        { error: `A category with this already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
