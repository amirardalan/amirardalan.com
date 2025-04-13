import { PostHog } from 'posthog-node';
import posthogJs from 'posthog-js';

// Server-side PostHog client
export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}

// Types for better intellisense and type checking
type EventProperties = Record<string, any>;

/**
 * Track a custom event (client-side)
 */
export function trackEvent(eventName: string, properties?: EventProperties) {
  if (typeof window !== 'undefined') {
    posthogJs.capture(eventName, properties);
  }
}

/**
 * Identify a user (client-side)
 */
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthogJs.identify(userId, properties);
  }
}

/**
 * Reset user identity for logout (client-side)
 */
export function resetUserIdentity() {
  if (typeof window !== 'undefined') {
    posthogJs.reset();
  }
}

/**
 * Track button click with standardized properties
 */
export function trackButtonClick(
  buttonName: string,
  properties?: EventProperties
) {
  trackEvent('button_clicked', {
    button_name: buttonName,
    ...properties,
  });
}

/**
 * Track form submission with standardized properties
 */
export function trackFormSubmission(
  formName: string,
  properties?: EventProperties
) {
  trackEvent('form_submitted', {
    form_name: formName,
    ...properties,
  });
}

/**
 * Enable or disable tracking based on user consent
 */
export function setTrackingEnabled(enabled: boolean) {
  if (typeof window !== 'undefined') {
    if (enabled) {
      posthogJs.opt_in_capturing();
    } else {
      posthogJs.opt_out_capturing();
    }
  }
}
