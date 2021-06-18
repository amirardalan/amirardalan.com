import { Global } from '@emotion/react'

// Typography
const fontPrimary = "'Fira Code', Menlo, Monaco, 'Courier New', monospace"
const fontSecondary = "'Poppins', Helvetica, Arial, sans-serif"
const fontTertiary = "'Lora', 'Times New Roman', Times, serif"

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
const buttonDisabled = '#8b8b8b'
const warning = '#ec4949'
const codeHighlightDark = '#2e3440'
const codeHighlightLight = "#e3e6eb"
const sunrise = 'linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)'
const sunset = 'linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%)'

export function GlobalStyles () {

  return (
    <>
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
        'body, body[data-theme="light"], body[data-theme="dark"]': {
          '--font-primary': fontPrimary,
          '--font-secondary': fontSecondary,
          '--font-tertiary': fontTertiary,
          '--color-warning': warning,
          '--color-button-disabled': buttonDisabled,
          '--color-select': grayAccentLight,
        },
        'body, body[data-theme="light"]': {
          '--color-accent': lightAccent,
          '--color-accent-color': primary,
          '--color-accent-gray': grayAccentLight,
          '--color-gray': grayDark,
          '--color-bg': light,
          '--color-text': darkAccent,
          '--color-link': primary,
          '--color-select-text': light,
          '--color-input-disabled': light,
          '--button-toggle-bg': lightAccent,
          '--button-toggle-switch': darker,
          '--icon-github': 'url(/icons/github-light.svg)',
          '--icon-twitter': 'url(/icons/twitter-light.svg)',
          '--icon-linkedin': 'url(/icons/linkedin-light.svg)',
          '--icon-spotify': 'url(/icons/spotify-light.svg)',
          '--icon-spotify-footer': 'url(/icons/spotify-dark.svg)',
          '--icon-external-link': 'url(/icons/external-link-dark.svg)',
          '--icon-download': 'url(/icons/download-light.svg)',
          '--canvas-bg': sunset,
          '--page-bg': lighter,
          '--code-highlight': codeHighlightLight,
          '--syntax-highlight-bg': lighter,
        },
        
        'body[data-theme="dark"]': {
          '--color-accent': darkAccent,
          '--color-accent-color': secondary,
          '--color-accent-gray': grayAccentDark,
          '--color-gray': grayLight,
          '--color-bg': dark,
          '--color-text': lightAccent,
          '--color-link': secondary,
          '--color-select-text': dark,
          '--color-input-disabled': dark,
          '--icon-github': 'url(/icons/github-dark.svg)',
          '--icon-twitter': 'url(/icons/twitter-dark.svg)',
          '--icon-linkedin': 'url(/icons/linkedin-dark.svg)',
          '--icon-spotify': 'url(/icons/spotify-dark.svg)',
          '--icon-spotify-footer': 'url(/icons/spotify-light.svg)',
          '--icon-external-link-thin': 'url(/icons/external-link-thin-light.svg)',
          '--icon-external-link': 'url(/icons/external-link-light.svg)',
          '--icon-external-link-footer': 'url(/icons/external-link-light.svg)',
          '--icon-download': 'url(/icons/download-dark.svg)',
          '--button-toggle-bg': darker,
          '--button-toggle-switch': lighter,
          '--canvas-bg': sunrise,
          '--page-bg': darkAccent,
          '--code-highlight': codeHighlightDark,
          '--syntax-highlight-bg': darkAccent,
        }
      }} />
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
        'h2, h3': {
          fontFamily: 'var(--font-secondary)',
          fontWeight: 900
        },
        a: {
          cursor: 'pointer',
          margin: 0,
          padding: 0,
          fontSize: '100%',
          verticalAlign: 'baseline',
          background: 'transparent',
          color: 'var(--color-link)',
          textDecoration: 'underline',
          '&.externalLink:after': {
            marginLeft: '.3rem',
            content: '""',
            background: 'var(--icon-external-link) no-repeat',
            height: 12,
            width: 12,
          },
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
        '.icon': {
          WebkitTransformStyle: 'preserve-3d',
        },
        '#leva__root': {
          display: 'none'
        }
      }} />
      <Global styles={{
        // Layout
        '.container': {
          minHeight: '50vh',
          marginTop: '2rem',
          padding: '0 4rem',
          position: 'relative',
          '.pageHeading': {
            marginBottom: '3rem',
            fontFamily: 'var(font-secondary)',
            fontSize: 'calc(3.2vw + 3.2vh)',
            WebkitMarqueeIncrement: '0vw',
            fontWeight: 900,
            textAlign: 'center',
          },
          '@media(max-width: 1024px)': {
            padding: '0 2.5rem',
            '.pageHeading': {
              marginBottom: '2.5rem',
              lineHeight: '3rem',
            }
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
        // Text Highlighting
        '::selection': {
          background: 'var(--color-select)',
          color: 'var(--color-select-text)',
        },
      }} />
      <Global styles={{
        // Animation
        '.animationWrapper':{
          width: '100%',
          overflow: 'hidden',
          alignSelf: 'flex-end',
        },
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


