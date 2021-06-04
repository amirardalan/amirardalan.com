// Colors
const light= '#ffffff'
const lightAccent = '#f1f1f1'
const lighter = '#e2e2e2'
const dark= '#000'
const darkAccent = '#111'
const darker = '#222'
const primary = '#6e00b8'
const secondary = '#4BB7D8'
const grayLight = '#7e7e7e'
const grayDark = '#4b4b4b'
const selection = '#ffff00'
const buttonDisabled = '#8b8b8b'
const warning = '#ec4949;'

// Typography
const fontPrimary = "'Fira Code', Menlo, Monaco, 'Courier New', monospace"
const fontSecondary = "'Poppins', Helvetica, Arial, sans-serif"
const fontTertiary = "'Lora', 'Times New Roman', Times, serif"

// Light Theme
export const themeLight = {
  fonts: {
    primary: fontPrimary,
    secondary: fontSecondary,
    tertiary: fontTertiary,
  },
  colors: {
    accentColor: primary,
    background: light,
    text: dark,
    link: primary,
    accent: lightAccent,
    grayscale: grayDark,
    footerLink: primary,
    highlight: light,
    highlightBg: dark,
    selection: selection,
    selectionText: dark,
    disabledInput: light,
    disabledBtn: buttonDisabled,
    warning: warning,
  },
  logo: "/logoLight.svg",
  logoError: '/logoErrorDark.svg',
  helloEmoji: '👋',
  toggleButton: {
    background: lightAccent,
    switch: darker,
  },
  canvas: {
    textSmall: 'Rotate & Zoom',
    mesh: primary,
  },
  page: {
    bg: lighter,
  },
  social: {
    github: '/icon-github-dark.svg',
    twitter: '/icon-twitter-dark.svg',
    linkedin: '/icon-linkedin-dark.svg',
  }
}

// Dark Theme
export const themeDark = {
  fonts: {
    primary: fontPrimary,
    secondary: fontSecondary,
    tertiary: fontTertiary,
  },
  colors: {
    accentColor: secondary,
    background: dark,
    text: light,
    link: secondary,
    accent: darkAccent,
    grayscale: grayLight,
    footerLink: secondary,
    selection: selection,
    selectionText: dark,
    disabledInput: dark,
    disabledBtn: buttonDisabled,
    warning: warning,
  },
  logo: '/logoDark.svg',
  logoError: '/logoErrorLight.svg',
  helloEmoji: '✌️',
  toggleButton: {
    background: darker,
    switch: lighter,
  },
  canvas: {
    textSmall: 'Rotate + Zoom',
    mesh: secondary,
  },
  page: {
    bg: darkAccent,
  },
  social: {
    github: '/icon-github-light.svg',
    twitter: '/icon-twitter-light.svg',
    linkedin: '/icon-linkedin-light.svg',
  }
}