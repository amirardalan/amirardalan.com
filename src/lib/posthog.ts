import { PostHog } from 'posthog-node';
import posthog from 'posthog-js';

// Helper to determine if we're in admin section
function isInAdminSection(): boolean {
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith('/admin');
  }
  return false;
}

// Server-side PostHog client
export function createServerPostHogClient() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn('PostHog API key not found');
    return null;
  }

  // Don't track in development or preview environments
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  ) {
    return null;
  }

  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}

// Types for better intellisense and type checking
type EventProperties = Record<string, any>;

/**
 * Track a custom event (client-side)
 */
export function trackEvent(eventName: string, properties?: EventProperties) {
  if (typeof window !== 'undefined' && !isInAdminSection()) {
    posthog.capture(eventName, properties);
  }
}

/**
 * Identify a user (client-side)
 */
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && !isInAdminSection()) {
    posthog.identify(userId, properties);
  }
}

/**
 * Reset user identity for logout (client-side)
 */
export function resetUserIdentity() {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
}

/**
 * Track button click with standardized properties
 */
export function trackButtonClick(
  buttonName: string,
  properties?: EventProperties
) {
  if (!isInAdminSection()) {
    trackEvent('button_clicked', {
      button_name: buttonName,
      ...properties,
    });
  }
}

/**
 * Track form submission with standardized properties
 */
export function trackFormSubmission(
  formName: string,
  properties?: EventProperties
) {
  if (!isInAdminSection()) {
    trackEvent('form_submitted', {
      form_name: formName,
      ...properties,
    });
  }
}

/**
 * Enable or disable tracking based on user consent
 */
export function setTrackingEnabled(enabled: boolean) {
  if (typeof window !== 'undefined') {
    if (enabled) {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }
}
