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

export async function getPageviews(route: string): Promise<number> {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    console.warn('PostHog API key or project ID missing');
    return 0;
  }

  // Filter by route directly in the HogQL query
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

  try {
    const res = await fetch(buildPostHogUrl(route), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
      // Disable fetch caching for debugging, re-enable later if needed
      cache: 'no-store',
      // next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('PostHog API error:', res.status, text);
      return 0;
    }

    const data = await res.json();
    if (!data?.results) {
      console.warn(`PostHog API returned no results for ${route}:`, data);
      return 0;
    }

    // Result should be [[views_count]] or potentially [{ views: views_count }]
    const resultRow = data.results[0];
    if (Array.isArray(resultRow)) {
      return resultRow[0] ?? 0; // First element of the first row
    } else if (typeof resultRow === 'object' && resultRow !== null) {
      return resultRow.views ?? 0; // 'views' property if it's an object
    }
    return 0; // Default to 0 if format is unexpected
  } catch (err) {
    console.error(`Error fetching PostHog pageviews for ${route}:`, err);
    return 0;
  }
}
