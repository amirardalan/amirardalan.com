'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Only initialize PostHog on the client side
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // We'll handle this manually
    capture_pageleave: true,
    disable_session_recording: process.env.NODE_ENV === 'development',
    loaded: (posthog) => {
      // Disable capturing in development
      if (process.env.NODE_ENV === 'development') {
        posthog.opt_out_capturing();
      }

      // Disable capturing in admin routes
      if (window.location.pathname.startsWith('/admin')) {
        posthog.opt_out_capturing();
      }
    },
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Opt out of tracking when in admin section
  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      posthog.opt_out_capturing();
    } else {
      // Only opt in if we're not in development
      if (process.env.NODE_ENV !== 'development') {
        posthog.opt_in_capturing();
      }
    }
  }, [pathname]);

  return (
    <PHProvider client={posthog}>
      <PostHogPageViewTracker />
      {children}
    </PHProvider>
  );
}

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Check if we're in admin section
      if (pathname.startsWith('/admin')) {
        return;
      }

      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url += `?${searchParams.toString()}`;
      }

      // Send pageview
      posthog.capture('$pageview', {
        $current_url: url,
        path: pathname,
        route_pattern: getRoutePattern(pathname),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Helper to normalize route patterns
function getRoutePattern(pathname: string): string {
  // Handle common dynamic routes
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return '/blog/:slug';
  }
  // Add more route pattern normalizations as needed
  return pathname;
}
