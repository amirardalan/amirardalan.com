declare global {
  interface Window {
      gtag: any
  }
}

export const pageview = (url: URL) => {
  window.gtag('config', `${process.env.GOOGLE_ANALYTICS_ID}`, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}