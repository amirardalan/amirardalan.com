import { unstable_cache } from 'next/cache';
import { getPostTitleSlugBySlug } from '@/db/queries/posts'; // Assuming this exists or will be created

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

// Fetch the most viewed blog post from PostHog
export async function fetchMostViewedPost(): Promise<{
  title: string;
  slug: string;
  views: number;
} | null> {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    console.warn('PostHog API key or project ID missing for most viewed query');
    return null;
  }

  // Query to get page paths and their view counts, ordered descending, limited to blog posts
  const query = {
    query: {
      kind: 'HogQLQuery',
      query: `
        SELECT
          properties.path as slug_path,
          count() AS views
        FROM events
        WHERE event = '$pageview'
          AND properties.path LIKE '/blog/%'
          AND properties.path != '/blog'
        GROUP BY slug_path
        ORDER BY views DESC
        LIMIT 1
      `,
    },
  };

  const url = `${POSTHOG_API_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`; // Use base query endpoint

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
      // Use a shorter revalidation for stats if desired, or keep it longer
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error(
        `PostHog API error for most viewed: ${res.status}`,
        responseText
      );
      return null;
    }

    const data = JSON.parse(responseText);
    if (!data?.results || data.results.length === 0) {
      console.warn(`PostHog API returned no results for most viewed:`, data);
      return null;
    }

    // Results might be [slug_path, views]
    const [slugPath, views] = data.results[0];

    if (!slugPath || typeof views !== 'number') {
      console.warn(
        'Unexpected PostHog result format for most viewed:',
        data.results[0]
      );
      return null;
    }

    // Extract slug from path like "/blog/my-post-slug"
    const slug = slugPath.split('/').pop();

    if (!slug) {
      return null;
    }

    // Get title from DB using the slug
    const postDetails = await getPostTitleSlugBySlug(slug); // Need this DB query function
    if (!postDetails) {
      console.warn(
        `Could not find post details in DB for most viewed slug: ${slug}`
      );
      return null;
    }

    return {
      title: postDetails.title,
      slug: slug,
      views: views,
    };
  } catch (err) {
    console.error(`Error fetching PostHog most viewed post:`, err);
    return null;
  }
}

// Add a cached version if needed, similar to getCachedPageviews
export const getCachedMostViewedPost = unstable_cache(
  async () => {
    return fetchMostViewedPost();
  },
  ['posthog-most-viewed'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['pageviews', 'stats'], // Add relevant tags
  }
);
