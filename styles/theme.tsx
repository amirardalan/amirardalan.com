  const light = {
    logo: '/logo/logo-light.svg',
    code: 'light',
    canvas: '#571AFF',
    emoji: '👋',
    icon: {
      github: '/static/icons/github-light.svg',
      twitter: '/static/icons/twitter-light.svg',
      linkedin: '/static/icons/linkedin-light.svg',
      error: '/static/icons/error-light.svg',
    },
  }
  const dark = {
    logo: '/logo/logo-dark.svg',
    code: 'dark',
    canvas: '#571AFF',
    emoji: '✌️',
    icon: {
      github: '/static/icons/github-dark.svg',
      twitter: '/static/icons/twitter-dark.svg',
      linkedin: '/static/icons/linkedin-dark.svg',
      error: '/static/icons/error-dark.svg',
    },
  }

  let activeTheme = 'light'

  const theme = activeTheme === 'dark'
    ? dark
    : light

  export default theme