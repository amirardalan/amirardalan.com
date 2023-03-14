declare global {
  interface Window {
    gtag: Function;
  }
}

export const pageview = (url: URL) => {
  window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID, {
    cookie_flags: 'SameSite=None;Secure',
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
