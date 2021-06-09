  // Light Theme
  const light = {
    icon: {
      github: '/static/icons/github-light.svg',
      twitter: '/static/icons/github-light.svg',
      linkedin: '/static/icons/github-light.svg',
    },
    logo: {
      app: '/logo/logo-light.svg',
      err: '/static/icons/error-light.svg',
    },
    emoji: {
      hello: '👋',
    },
    code: {
      theme: 'light',
    },
  }

  // Dark Theme
  const dark = {
    icon: {
      github: '/static/icons/github-dark.svg',
      twitter: '/static/icons/github-dark.svg',
      linkedin: '/static/icons/github-dark.svg',
    },
    logo: {
      app: '/logo/logo-dark.svg',
      err: '/static/icons/error-dark.svg',
    },
    emoji: {
      hello: '✌️',
    },
    code: {
      theme: 'dark',
    },
  }

  let activeTheme = 'dark'

  const theme = activeTheme === 'dark'
    ? dark
    : light

  export default theme