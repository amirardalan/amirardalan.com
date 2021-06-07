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
const grayDark = '#697075'
const grayAccentLight = '#b8c1c7'
const grayAccentDark = '#3e4449'
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
    grayAccent: grayAccentLight,
    footerLink: primary,
    highlight: light,
    highlightBg: dark,
    selection: selection,
    selectionText: dark,
    disabledInput: light,
    disabledBtn: buttonDisabled,
    warning: warning,
    code: code,
  },
  logo: "/logo/logo-light.svg",
  logoError: '/static/icons/error-light.svg',
  helloEmoji: '👋',
  toggleButton: {
    background: lightAccent,
    switch: darker,
  },
  canvas: {
    textSmall: ' ',
    mesh: primary,
    background: 'linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%)'
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
    background: lighter,
  },
  leva: {
    background: 'red',
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
    grayAccent: grayAccentDark,
    footerLink: secondary,
    selection: selection,
    selectionText: dark,
    disabledInput: dark,
    disabledBtn: buttonDisabled,
    warning: warning,
    code: code,
  },
  logo: '/logo/logo-dark.svg',
  logoError: '/static/icons/error-dark.svg',
  helloEmoji: '✌️',
  toggleButton: {
    background: darker,
    switch: lighter,
  },
  canvas: {
    textSmall: ' ',
    mesh: secondary,
    background: 'linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)'
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
  },
  leva: {
    background: 'red',
  }
}