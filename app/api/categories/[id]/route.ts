import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCategoryById } from '@/db/queries/categories';

// Get category by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const result = await getCategoryById(id);

    if (!result) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const { name, slug } = await request.json();
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Update the category
    const [result] = await db
      .update(categories)
      .set({
        name,
        slug,
        updated_at: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    if (!result) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error updating category:', error);

    // Check for duplicate slug error
    if (error.message?.includes('categories_slug_unique')) {
      return NextResponse.json(
        { error: `A category with this slug already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Delete the category
    const [result] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (!result) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}
