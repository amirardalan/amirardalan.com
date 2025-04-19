import { NextRequest, NextResponse } from 'next/server';
import { getCachedPageviews } from '@/services/views';

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.VERCEL_ENV === 'development';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const route = searchParams.get('route');
    if (!route) {
      return NextResponse.json(
        { error: 'Missing route parameter' },
        { status: 400 }
      );
    }

    const views = await getCachedPageviews(route);

    return NextResponse.json({ route, views });
  } catch (error) {
    if (isDev) {
      const route = new URL(req.url).searchParams.get('route') || '';
      return NextResponse.json({ route: route, views: 0 });
    }
    console.error('Error fetching pageviews via API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pageviews' },
      { status: 500 }
    );
  }
}
