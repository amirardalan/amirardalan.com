// Colors
const light= '#e2e2e2'
const lightAccent = '#cccccc'
const lighter = '#eaeaea'
const dark= '#2a2734'
const darkAccent = '#3a3746'
const darker = '#1e1c25'
const primary = '#7A00CC'
const secondary = '#21c8e5'
const grayLight = '#a8a8a8'
const grayDark = '#5e5e5e'
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
    background: dark,
    switch: lighter,
  },
  canvas: {
    textSmall: 'Rotate & Zoom',
    textAnim: 'fadeIn 3s forwards',
    meshA: primary,
  },
  page: {
    bg: lighter,
  },
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
    background: lightAccent,
    switch: darker,
  },
  canvas: {
    textSmall: 'Rotate + Zoom',
    textAnim: 'fadeIn 3s forwards',
    meshA: secondary,
  },
  page: {
    bg: darkAccent,
  }
}