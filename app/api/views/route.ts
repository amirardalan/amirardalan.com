import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.VERCEL_ENV === 'development';

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_API_HOST =
  process.env.POSTHOG_API_HOST || 'https://app.posthog.com';

function buildPostHogUrl(route: string) {
  // Use the correct singular endpoint for PostHog Cloud
  return `${POSTHOG_API_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`;
}

async function fetchPageviewsFromPostHog(route: string): Promise<number> {
  // Only return 0 if credentials are missing, not just because it's dev
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return 0;
  }

  // Use the same grouped query as your service
  const query = {
    query: {
      kind: 'HogQLQuery',
      query: `
        SELECT properties.path, count() AS views
        FROM events
        WHERE event = '$pageview'
        GROUP BY properties.path
        ORDER BY views DESC
      `,
    },
  };

  const res = await fetch(buildPostHogUrl(route), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${POSTHOG_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
    next: { revalidate: 60 }, // 1 minute
  });

  if (!res.ok) {
    throw new Error('Failed to fetch pageviews from PostHog');
  }

  const data = await res.json();
  if (!data?.results) {
    return 0;
  }
  // Only match array results: [path, views]
  const match = data.results.find(
    (row: any) => Array.isArray(row) && row[0] === route
  );
  return match ? match[1] ?? 0 : 0;
}

const getPageviews = unstable_cache(
  async (route: string) => {
    return await fetchPageviewsFromPostHog(route);
  },
  ['posthog-pageviews'],
  { revalidate: 60 } // 1 minute
);

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

    const views = await getPageviews(route);

    return NextResponse.json({ route, views });
  } catch (error) {
    // In dev, just return 0 views instead of error
    if (isDev) {
      return NextResponse.json({ route: '', views: 0 });
    }
    console.error('Error fetching pageviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pageviews' },
      { status: 500 }
    );
  }
}
