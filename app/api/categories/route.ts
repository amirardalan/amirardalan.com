import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { categories } from '@/db/schema';

// Only POST is implemented for now
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
    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
