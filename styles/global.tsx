import { Global } from '@emotion/react'

// Typography
const fontPrimary = '"JetBrains Mono", Menlo, Monaco, "Courier New", monospace'
const fontSecondary = '"Poppins", Helvetica, Arial, sans-serif'
const fontTertiary = '"PT Serif", "Times New Roman", Times, serif'

// Colors
const light = '#e4e9f8'
const lightAccent = '#dde2f1'
const lighter = '#d8dbed'
const dark = '#262738'
const darkAccent = '#2f3044'
const darker = '#191a22'
const primary = '#744164'
const secondary = '#3dffc5'
const grayLight = '#b0bccc'
const grayDark = '#706f8a'
const grayAccentLight = '#b7b7c9'
const grayAccentDark = '#494a5c'
const buttonDisabled = '#9e9eb6'
const warning = '#e64358'
const codeHighlightDark = '#393a4e'
const codeHighlightLight = '#d5d7eb'
const sunrise = 'linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)'
const sunset = 'linear-gradient(to bottom, #111011 30%,#451f4d 80%,#311946 100%)'

export function GlobalStyles () {

  return (
    <>
      <Global styles={{
        '@font-face': {
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 900,
          fontDisplay: 'swap',
          src: 'url("/fonts/poppins-latin-900.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        '@font-face': {
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 700,
          fontDisplay: 'swap',
          src: 'url("/fonts/poppins-latin-700.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        '@font-face': {
          fontFamily: 'JetBrains Mono',
          fontStyle: 'normal',
          fontWeight: 400,
          fontDisplay: 'swap',
          src: 'url("/fonts/jetbrains-mono-v11-latin-regular.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        '@font-face': {
          fontFamily: 'PT Serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontDisplay: 'swap',
          src: 'url("/fonts/pt-serif-v16-latin-regular.woff2") format("woff2")',
        },
      }}/>
      <Global styles={{
        '@font-face': {
          fontFamily: 'Bitter',
          fontStyle: 'italic',
          fontWeight: 400,
          fontDisplay: 'swap',
          src: 'url("/fonts/pt-serif-v16-latin-italic.woff2") format("woff2")'
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
          '--color-accent-darker': lighter,
          '--color-accent-color': primary,
          '--color-accent-gray': grayAccentLight,
          '--color-gray': grayDark,
          '--color-bg': light,
          '--color-text': darkAccent,
          '--color-input-disabled': light,
          '--canvas-bg': sunset,
          '--page-bg': lighter,
          '--code-highlight': codeHighlightLight,
          '--syntax-highlight-bg': lightAccent,
          '--icon-info': 'url(/icons/note-dark.svg)',
          '--icon-arrow': 'url(/icons/arrow-dark.svg)',
        },
        
        'body[data-theme="dark"]': {
          '--color-accent': darkAccent,
          '--color-accent-darker': darker,
          '--color-accent-color': secondary,
          '--color-accent-gray': grayAccentDark,
          '--color-gray': grayLight,
          '--color-bg': dark,
          '--color-text': lightAccent,
          '--color-input-disabled': dark,
          '--canvas-bg': sunrise,
          '--page-bg': darkAccent,
          '--code-highlight': codeHighlightDark,
          '--syntax-highlight-bg': darkAccent,
          '--icon-info': 'url(/icons/note-light.svg)',
          '--icon-arrow': 'url(/icons/arrow-light.svg)',
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
          borderTop: '1px solid var(--color-accent-gray)',
          margin: '4rem 0 1.5em 0',
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
          },
          '&:focus': {
            boxShadow: '0 0 0 2px var(--color-accent-color)',
            outline: 'none',
          },
          '&:focus:not(:focus-visible)': { boxShadow: 'none' },
        },
        title: {
          margin: 0,
          padding: 0,
        },
        'h1, h2, h3': {
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
          color: 'var(--color-accent-color)',
          textDecoration: 'underline',
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
        button: {
          background: 'transparent',
          border: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'var(--color-accent-color)',
          cursor: 'pointer',
        },
        '.icon': {
          WebkitTransformStyle: 'preserve-3d',
        },
        'input[type="text"], textarea': {
          width: '100%',
          margin: '0.5rem 0',
          padding: '0.5rem',
          webkitAppearance: 'none',
          appearance: 'none',
          backgroundColor: 'var(--color-accent)',
          border: '2px solid var(--color-accent)',
          borderRadius: '0.25rem',
          WebkitTextFillColor: 'var(--color-gray)',
          fontSize: 16,
          '&:disabled': {
            backgroundColor: 'var(--color-input-disabled)',
            WebkitTextFillColor: 'var(--color-accent-gray)',
          },
          '@media (max-width: 890px)': {
            width: '100%'
          }
        },
      }} />
      <Global styles={{
        // Layout
        '.container': {
          minHeight: '50vh',
          marginTop: '2rem',
          padding: '0 4rem',
          position: 'relative',
          '.pageHeading': {
            marginBottom: '1rem',
            fontFamily: 'var(font-secondary)',
            fontSize: 40,
            WebkitMarqueeIncrement: '0vw',
            fontWeight: 900,
            textAlign: 'left',
          },
          '@media(max-width: 1024px)': {
            padding: '0 2.5rem',
            '.pageHeading': {
              marginBottom: '1.5rem',
            }
          },
          '@media (max-width: 600px)': {
            marginTop: '.5rem',
            padding: '0 1.5rem',
          },
        }
      }} />
      <Global styles={{
        // CTA Button
        '.ctaButton': {
          minWidth: 128,
          minHeight: 45,
          marginRight: '.8rem',
          marginBottom: '.8rem',
          padding: '.5rem 1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--color-text)',
          border: '1px solid transparent',
          borderRadius: 8,
          color: 'var(--color-bg)',
          fontFamily: 'var(--font-primary)',
          fontSize: 15,
          fontWeight: 400,
          textDecoration: 'none',
          cursor: 'pointer',
          '&:first-of-type': {
            marginLeft: 0,
          },
          '&:last-of-type': {
            marginRight: 0,
          },
          '&:only-of-type': {
            margin: 0,
          },
          'span.none': {
            display: 'none',
          },
          '&:hover': {
            background: 'var(--color-accent-color)',
            border: '1px solid var(--color-accent-color)',
          },
          '&.disabled': {
            cursor: 'pointer',
            background: 'transparent',
            color: 'var(--color-text)',
            border: '1px solid var(--color-accent-gray)',
            '&:hover': {
              background: 'transparent',
              border: '1px solid var(--color-accent-gray)'
            },
            '&:active': {
              border: '1px solid var(--color-accent-color)'
            },
          },
          '.icon': {
            marginLeft: '.4rem',
            lineHeight: 0,
          },
          '@media(max-width: 1024px)': {
            '&:hover': {
              background: 'var(--color-text)',
              border: '1px solid transparent',
            },
          },
          '@media(max-width: 480px)': {
            marginRight: 0,
            '.home &: nth-of-type(1)': {
              marginRight: 10
            },
            width: '100%',
          }
        }
      }}/>
      <Global styles={{
        // Utils
        '.hidden': {
          display: 'none'
        },
        '.center': {
          display: 'flex',
          justifyContent: 'center',
        },
      }} />
      <Global styles={{
        // Text Highlighting
        '::selection': {
          background: 'var(--color-select)',
          color: 'var(--color-bg)',
        },
      }} />
      <Global styles={{
        // Animation
        '.animationWrapper':{
          width: '100%',
          overflow: 'hidden',
          alignSelf: 'flex-end',
        },
        '@keyframes slideUpSection': {
          '0%': {
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
          }
        },
        '@keyframes slideUp': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          }
        },
        '@keyframes tooltipUp': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)',
          },
          '10%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          },
          '90%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translate3d(0, 100%, 0)',
            opacity: 0,
          }
        },
        '@keyframes tooltipDown': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)',
          },
          '10%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          },
          '90%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translate3d(0, -100%, 0)',
            opacity: 0,
          }
        },
        '@keyframes growDown': {
          from: {
            transform: 'translate3d(0, -100%, 0)',
          },
          to: {
            transform: 'translate3d(0, 0, 0)',
          }
        },
        '@keyframes growUp': {
          from: {
            height: '100%',
            transform: 'translate3d(0, 0, 0)',
          },
          to: {
            transform: 'translate3d(0, -100%, 0)',
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


