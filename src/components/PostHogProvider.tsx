'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      capture_pageview: false,
      capture_pageleave: true,
      loaded: function (ph) {
        if (
          process.env.NODE_ENV === 'development' ||
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
        ) {
          ph.opt_out_capturing();
          ph.set_config({ disable_session_recording: true });
          console.log(
            'PostHog tracking disabled in development/preview environment'
          );
        }
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += '?' + search;
      }

      // Enhanced pageview with additional properties
      posthog.capture('$pageview', {
        $current_url: url,
        path: pathname,
        route_pattern: getRoutePattern(pathname),
        search_params: Object.fromEntries(searchParams.entries()),
        referrer: document.referrer || null,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Helper to normalize route patterns (e.g., converts /blog/[slug] to /blog/:slug)
function getRoutePattern(pathname: string): string {
  // Handle common dynamic routes
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return '/blog/:slug';
  }
  // Add more route pattern normalizations as needed
  return pathname;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
