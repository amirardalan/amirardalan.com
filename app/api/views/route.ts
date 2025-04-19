import { NextRequest, NextResponse } from 'next/server';
import { getCachedPageviews } from '@/services/views';

const isLocalDev = process.env.NODE_ENV === 'development';

export async function GET(req: NextRequest) {
  const route = req.nextUrl.searchParams.get('route');
  if (!route) {
    return NextResponse.json(
      { error: 'Missing route parameter' },
      { status: 400 }
    );
  }

  try {
    const views = await getCachedPageviews(route);

    return NextResponse.json({ route, views });
  } catch (error) {
    console.error(`API route error fetching pageviews for ${route}:`, error);
    if (isLocalDev) {
      return NextResponse.json({ route: route, views: 0 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch pageviews' },
      { status: 500 }
    );
  }
}
