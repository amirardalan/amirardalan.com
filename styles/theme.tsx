  // Light Theme
  const light = {
    // @/components/Logo
    logo: '/logo/logo-light.svg',
    // @/components/BlogMarkdown
    code: {
      syntax: 'light',
    },
    // @/components/CanvasTerrain
    canvas: {
      mesh: '#571AFF'
    },
    // pages/index
    emoji: {
      hello: '👋',
    },
    // pages/about
    icon: {
      github: '/static/icons/github-light.svg',
      twitter: '/static/icons/twitter-light.svg',
      linkedin: '/static/icons/linkedin-light.svg',
      error: '/static/icons/error-light.svg',
    },
  }

  // Dark Theme
  const dark = {
    // @/components/Logo
    logo: '/logo/logo-dark.svg',
    // @/components/BlogMarkdown
    code: {
      syntax: 'dark',
    },
    // @/components/CanvasTerrain
    canvas: {
      mesh: '#3dffc5'
    },
    // pages/index
    emoji: {
      hello: '✌️',
    },
    // pages/about
    icon: {
      github: '/static/icons/github-dark.svg',
      twitter: '/static/icons/twitter-dark.svg',
      linkedin: '/static/icons/linkedin-dark.svg',
      error: '/static/icons/error-dark.svg',
    },
  }

  let activeTheme = 'dark'

  const theme = activeTheme === 'dark'
    ? dark
    : light

  export default theme