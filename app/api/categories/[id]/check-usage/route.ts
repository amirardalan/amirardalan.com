import { NextRequest, NextResponse } from 'next/server';
import { isCategoryUsedByPosts } from '@/db/queries/categories';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(await params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const inUse = await isCategoryUsedByPosts(id);

    return NextResponse.json({ inUse });
  } catch (error: any) {
    console.error('Error checking category usage:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check category usage' },
      { status: 500 }
    );
  }
}
