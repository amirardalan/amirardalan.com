import { unstable_cache } from 'next/cache';

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_API_HOST =
  process.env.POSTHOG_API_HOST || 'https://app.posthog.com';

function buildPostHogUrl(route: string) {
  const encodedRoute = encodeURIComponent(route);
  return `${POSTHOG_API_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/?route=${encodedRoute}`;
}

async function fetchPageviews(route: string): Promise<number> {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    console.warn('PostHog API key or project ID missing');
    return 0;
  }

  const query = {
    query: {
      kind: 'HogQLQuery',
      query: `
        SELECT count() AS views
        FROM events
        WHERE event = '$pageview'
          AND properties.path = '${route}'
      `,
    },
  };

  const url = buildPostHogUrl(route);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
      next: { revalidate: 3600 },
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error(
        `PostHog API error for ${route}: ${res.status}`,
        responseText
      );
      return 0;
    }

    const data = JSON.parse(responseText);
    if (!data?.results) {
      console.warn(`PostHog API returned no results for ${route}:`, data);
      return 0;
    }

    const resultRow = data.results[0];
    let views = 0;
    if (Array.isArray(resultRow)) {
      views = resultRow[0] ?? 0;
    } else if (typeof resultRow === 'object' && resultRow !== null) {
      views = resultRow.views ?? 0;
    }

    return views;
  } catch (err) {
    console.error(`Error fetching PostHog pageviews for ${route}:`, err);
    return 0;
  }
}

export const getCachedPageviews = unstable_cache(
  async (route: string) => {
    return fetchPageviews(route);
  },
  ['posthog-pageviews'],
  {
    revalidate: 3600,
    tags: ['pageviews'],
  }
);
