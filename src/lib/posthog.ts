import { PostHog } from 'posthog-node';

export default function PostHogClient() {
  // Skip initialization in development
  if (process.env.NODE_ENV === 'development') {
    return {
      capture: () => {},
      identify: () => {},
      groupIdentify: () => {},
      isFeatureEnabled: () => false,
      getFeatureFlag: () => null,
      shutdownAsync: async () => {},
    } as unknown as PostHog;
  }

  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: 'https://us.i.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
