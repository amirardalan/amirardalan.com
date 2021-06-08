import { Global } from '@emotion/react'

export function GlobalStyles () {
  
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
  const select = '#ffff00'
  const buttonDisabled = '#8b8b8b'
  const warning = '#ec4949'
  const code = '#2e3440'

  // Typography
  const fontPrimary = "'Fira Code', Menlo, Monaco, 'Courier New', monospace"
  const fontSecondary = "'Poppins', Helvetica, Arial, sans-serif"
  const fontTertiary = "'Lora', 'Times New Roman', Times, serif"

  return (
    <>
      <Global styles={{
        'body, body[data-theme="light"]': {
          '--font-primary': fontPrimary,
          '--font-secondary': fontSecondary,
          '--font-tertiary': fontTertiary,
          '--color-accent': lightAccent,
          '--color-accent-color': primary,
          '--color-bg': light,
          '--color-text': dark,
          '--color-link': primary,
          '--color-gray': grayDark,
          '--color-gray-accent': grayAccentLight,
          '--color-select': select,
          '--color-select-text': dark,
          '--color-input-disabled': light,
          '--color-button-disabled': buttonDisabled,
          '--color-warning': warning,
          '--color-code': code,
          '--logo': '/logo/logo-light.svg',
          '--logo-error': '/static/icons/error-light.svg',
          '--emoji-hello': '👋',
          '--button-toggle-bg': lightAccent,
          '--button-toggle-switch': darker,
          '--canvas-mesh': primary,
          '--canvas-bg': 'linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%)',
          '--page-bg': lighter,
          '--social-github': '/static/icons/github-light.svg',
          '--social-twitter': '/static/icons/twitter-light.svg',
          '--social-linkedin': '/static/icons/linkedin-light.svg',
          '--syntax-highlight-theme': 'syntaxLight',
          '--syntax-highlight-bg': lighter,
          myVar: '👋',
        },
        
        'body[data-theme="dark"]': {
          '--font-primary': fontPrimary,
          '--font-secondary': fontSecondary,
          '--font-tertiary': fontTertiary,
          '--color-accent': darkAccent,
          '--color-accent-color': secondary,
          '--color-bg': dark,
          '--color-text': light,
          '--color-link': secondary,
          '--color-gray': grayLight,
          '--color-gray-accent': grayAccentDark,
          '--color-select': select,
          '--color-select-text': dark,
          '--color-input-disabled': dark,
          '--color-button-disabled': buttonDisabled,
          '--color-warning': warning,
          '--color-code': code,
          '--logo': '/logo/logo-dark.svg',
          '--logo-error': '/static/icons/error-dark.svg',
          '--emoji-hello': '👋',
          '--button-toggle-bg': darker,
          '--button-toggle-switch': lighter,
          '--canvas-mesh': secondary,
          '--canvas-bg': 'linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)',
          '--page-bg': darkAccent,
          '--social-github': '/static/icons/github-dark.svg',
          '--social-twitter': '/static/icons/twitter-dark.svg',
          '--social-linkedin': '/static/icons/linkedin-dark.svg',
          '--syntax-highlight-theme': 'syntaxDark',
          '--syntax-highlight-bg': darkAccent,
        }
      }} />
      <Global styles={{
        // @font: Poppins 900
        '@font-face': {
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 900,
          fontDisplay: 'swap',
          src: 'url("/fonts/poppins-latin-900.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        // @font: Poppins 700
        '@font-face': {
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 700,
          fontDisplay: 'swap',
          src: 'url("/fonts/poppins-latin-700.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        // @font: Fira Code 400
        '@font-face': {
          fontFamily: 'Fira Code',
          fontStyle: 'normal',
          fontWeight: 400,
          fontDisplay: 'swap',
          src: 'url("/fonts/fira-code-latin-400.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        // @font: Lora 500
        '@font-face': {
          fontFamily: 'Lora',
          fontStyle: 'normal',
          fontWeight: 500,
          fontDisplay: 'swap',
          src: 'url("/fonts/lora-latin-500.woff2") format("woff2")',
        },
      }}/>
      <Global styles={{
        // @font: Lora Italic 500
        '@font-face': {
          fontFamily: 'Lora',
          fontStyle: 'italic',
          fontWeight: 500,
          fontDisplay: 'swap',
          src: 'url("/fonts/lora-latin-500-italic.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        // Reset
        'html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video': {
          margin: 0,
          padding: 0,
          border: 0,
          fontSize: '100%',
          verticalAlign: 'baseline',
        },
        'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': { 
          display: 'block'
        },
        'nav ul': {
          listStyle: 'none'
        },
        'blockquote, q': {
          quotes: 'none'
        },
        'blockquote:before, blockquote:after, q:before, q:after': {
          content: '" "',
        },
        ins: {
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text)',
          textDecoration: 'none',
        },
        mark: {
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text)',
          fontStyle: 'italic',
          fontWeight: 'bold',
        },
        del: {
          textDecoration: 'line-through',
        },
        'abbr[title], dfn[title]': {
          borderBottom: '1px dotted',
          cursor: 'help',
        },
        table: {
          borderCollapse: 'collapse',
          borderSpacing: 0,
        },
        hr: {
          display: 'block',
          height: 1,
          border: 0,  
          borderTop: '1px solid var(--color-gray)',
          margin: '3em 0',
          padding: 0,
        },
        'input, select': {
          verticalAlign: 'middle',
        },
      }}/>
      <Global styles={{
        // Base
        'html, body': {
          backgroundColor: 'var(--color-bg)',
          fontFamily: 'var(--font-primary)',
          color: 'var(--color-text)',
          WebkitTextSizeAdjust: '100%',
        },
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          '&:before, &:after': {
              boxSizing: 'border-box',
          }
        },
        h1: {
          margin: 0,
          padding: 0,
        },
        h2: {
          fontFamily: 'var(--font-secondary)',
          fontWeight: 900
        },
        a: {
          margin: 0,
          padding: 0,
          fontSize: '100%',
          verticalAlign: 'baseline',
          background: 'transparent',
          color: 'var(--color-link)',
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'none'
          }
        },
        p: {
          margin: 0,
          padding: 0,
          lineHeight: '1.8rem',
        },
        'ul, li': {
          listStyle: 'none',
          margin: 0,
          padding: 0,
        },
        'button, input, textarea': {
          fontFamily: 'var(--font-primary)'
        },
        '#leva__root': {
          display: 'none'
        }
      }} />
      <Global styles={{
        // Layout
        '.container': {
          padding: '0 4rem',
          position: 'relative',
          '@media(max-width: 1024px)': {
            padding: '0 2.5rem',
          },
          '@media (max-width: 600px)': {
            padding: '0 1.5rem',
          }
        }
      }} />
      <Global styles={{
        // Utils
        '.center': {
          display: 'flex',
          justifyContent: 'center',
        },
      }} />
      <Global styles={{
        // Special Text
        '::-moz-selection': {
          background: 'var(--color-select)',
          color: 'var(--color-select-text)',
        },
        '::selection': {
          background: 'var(--color-select)',
          color: 'var(--color-select-text)',
        },
      }} />
      <Global styles={{
        // Animation
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        '@keyframes fadeOut': {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        '@keyframes slideUp': {
          from: {
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)',
          },
          to: {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          }
        },
        '@keyframes slideDown': {
        from: {
          opacity: 0,
          transform: 'translate3d(0, -100%, 0)',
        },
          to: {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          }
        },
        '@keyframes dash': {
          '0%': {
            strokeDasharray: '1, 150',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-35',
          },
          '100%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-124',
          }
        }
      }}/>
    </>
  )
}


