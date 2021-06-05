// Colors
const light= '#ffffff'
const lightAccent = '#eeeeee'
const lighter = '#f7f7f7'
const dark= '#000'
const darkAccent = '#14171a'
const darker = '#343042'
const primary = '#571AFF'
const secondary = '#3dffc5'
const grayLight = '#b0bccc'
const grayDark = '#444a4e'
const selection = '#ffff00'
const buttonDisabled = '#8b8b8b'
const warning = '#ec4949'
const code = '#2e3440'

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
    code: code,
    codeText: light,
  },
  logo: "/static/logo/logo-light.svg",
  logoError: '/static/icons/error-light.svg',
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
    github: '/static/icons/github-light.svg',
    twitter: '/static/icons/twitter-light.svg',
    linkedin: '/static/icons/linkedin-light.svg',
  },
  syntaxHighlight: {
    theme: 'syntaxLight',
    background: lightAccent,
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
    code: code,
    codeText: light,
  },
  logo: '/static/logo/logo-dark.svg',
  logoError: '/static/icons/error-dark.svg',
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
    github: '/static/icons/github-dark.svg',
    twitter: '/static/icons/twitter-dark.svg',
    linkedin: '/static/icons/linkedin-dark.svg',
  },
  syntaxHighlight: {
    theme: 'syntaxDark',
    background: darkAccent
  }
}