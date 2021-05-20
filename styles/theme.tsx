export const themeLight = {
  colors: {
    background: '#e2e2e2',
    text: '#232227',
    textLight: '#666',
    link: '#7A00CC',
    linkLight: '#a34bdf',
    divider: '#cccccc',
    footer: '#5e5e5e',
    footerLink: '#7A00CC',
    highlight: '#c9c9c9',
    highlightBg: '#232227',
    selection: 'yellow',
    selectionText: '#232227',
    disabled: '#e2e2e2',
  },
  logo: "/logoLight.svg",
  logoError: '/logoErrorDark.svg',
  helloEmoji: '👋',
  toggleButton: {
    background: '#232227',
    text: 'Light Mode',
    icon: '/sun.svg',
    iconAlt: 'Sun Icon'
  },
  canvas: {
    text: '',
    textSmall: 'Rotate & Zoom',
    bg: '#302f35',
    meshA: '#9C66FF',
    zoomFrom: -300,
    zoomTo: -3,
    textAnim: 'fade-in 3s forwards',
    stars: 1000,
    duration: 4000
  },
  page: {
    bg: '#eaeaea'
  }
}

export const themeDark = {
  colors: {
    background: '#232227',
    text: '#e2e2e2',
    textLight: '#a8a8a8',
    link: '#21E598',
    linkLight: '#7bffca',
    divider: '#313036',
    footer: '#a8a8a8',
    footerLink: '#21E598',
    highlight: '#3b3942',
    highlightBg: '#e2e2e2',
    selection: 'yellow',
    selectionText: '#232227',
    disabled: '#232227'
  },
  logo: '/logoDark.svg',
  logoError: '/logoErrorLight.svg',
  helloEmoji: '✌️',
  toggleButton: {
    background: '#e2e2e2',
    text: 'Dark Mode',
    icon: '/moon.svg',
    iconAlt: 'Moon Icon',
  },
  canvas: {
    text: '',
    textSmall: 'Rotate + Zoom',
    bg: '#302f35',
    meshA: '#21E598',
    zoomFrom: -3,
    zoomTo: -300,
    textAnim: 'fade-in 3s forwards',
    stars: 3000,
    duration: 4000
  },
  page: {
    bg: '#302f35'
  }
}