declare global {
  interface Window {
    gtag: (command: 'config' | 'event', id: string, data?: any) => void;
  }
}

export const pageview = (url: URL) => {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (analyticsId) {
    window.gtag('config', analyticsId, {
      cookie_flags: 'SameSite=None;Secure',
      page_path: url,
    });
  }
};

export const gtagEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (analyticsId) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label ?? undefined,
      value: value ?? undefined,
    });
  }
};
