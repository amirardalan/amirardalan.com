'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Initialize PostHog only in production
    if (!isDevelopment && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/ingest',
        ui_host: 'https://app.posthog.com',
        capture_pageview: true,
        loaded: (posthog) => {
          // You can add debug logging here if needed
          console.log('PostHog loaded in production environment');
        },
      });
    } else {
      console.log('PostHog disabled in development environment');
    }
  }, [isDevelopment]);

  // In development, just render children without PostHog Provider
  if (isDevelopment) {
    return <>{children}</>;
  }

  // In production, use the PostHog Provider
  return <Provider client={posthog}>{children}</Provider>;
}
