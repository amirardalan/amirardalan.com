const light= '#e2e2e2'
const lightAccent = '#cccccc'
const dark= '#2d2a35'
const darkAccent = '#363341'
const darker = '#1e1c25'
const primary = '#7A00CC'
const secondary = '#21c8e5'
const grayLight = '#a8a8a8'
const grayDark = '#5e5e5e'
const selection = '#ffff00'
const buttonDisabled = '#8b8b8b'
const warning = '#ec4949;'

const fontPrimary = "'Fira Code', Menlo, Monaco, 'Courier New', monospace"
const fontSecondary = "'Poppins', Helvetica, Arial, sans-serif"
const fontTertiary = "'Lora', 'Times New Roman', Times, serif"

export const themeLight = {
  fonts: {
    fontPrimary: fontPrimary,
    fontSecondary: fontSecondary,
    fontTertiary: fontTertiary,
  },
  colors: {
    background: light,
    text: dark,
    link: primary,
    divider: lightAccent,
    footer: grayDark,
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
    icon: '☀️',
  },
  canvas: {
    textSmall: 'Rotate & Zoom',
    textAnim: 'fade-in 3s forwards',
    meshA: primary,
  },
}

export const themeDark = {
  fonts: {
    fontPrimary: fontPrimary,
    fontSecondary: fontSecondary,
    fontTertiary: fontTertiary,
  },
  colors: {
    background: dark,
    text: light,
    link: secondary,
    divider: darkAccent,
    footer: grayLight,
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
    icon: '🌙',
  },
  canvas: {
    textSmall: 'Rotate + Zoom',
    textAnim: 'fade-in 3s forwards',
    meshA: secondary,
  }
}