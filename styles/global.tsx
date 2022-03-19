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
const codeHighlight = '#393a4e'
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
          fontFamily: 'PT Serif',
          fontStyle: 'normal',
          fontWeight: 700,
          fontDisplay: 'swap',
          src: 'url("/fonts/pt-serif-v16-latin-700.woff2") format("woff2")'
        },
      }}/>
      <Global styles={{
        '@font-face': {
          fontFamily: 'PT Serif',
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
          '--logo': 'url(/logo/logo-light.svg)',
          '--logo-footer': 'url(/logo/logo-footer-light.svg)',
          '--color-primary': primary,
          '--color-bg': light,
          '--color-text': darkAccent,
          '--color-neutral': grayDark,
          '--color-accent-neutral': grayAccentLight,
          '--color-accent': lightAccent,
          '--color-accent-darker': lighter,
          '--color-gradient': sunset,
          '--page-bg': lighter,
          '--code-highlight': codeHighlight,
          '--code': lighter,
          '--code-bg': darkAccent,
          '--icon-info': 'url(/icons/note-dark.svg)',
          '--icon-arrow': 'url(/icons/arrow-dark.svg)',
          '--icon-spotify': 'url(/icons/spotify-dark.svg)',
          '--icon-external': 'url(/icons/external-link-light.svg)',
          '--icon-download': 'url(/icons/download-light.svg)',
          '--icon-time': 'url(/icons/time-light.svg)',
          '--icon-email': 'url(/icons/email-light.svg)',
          '--icon-clipboard': 'url(/icons/clipboard-dark.svg)',
        },
        
        'body[data-theme="dark"]': {
          '--logo': 'url(/logo/logo-dark.svg)',
          '--logo-footer': 'url(/logo/logo-footer-dark.svg)',
          '--color-primary': secondary,
          '--color-bg': dark,
          '--color-text': lightAccent,
          '--color-neutral': grayLight,
          '--color-accent-neutral': grayAccentDark,
          '--color-accent': darkAccent,
          '--color-accent-darker': darker,
          '--color-gradient': sunrise,
          '--page-bg': darkAccent,
          '--code': codeHighlight,
          '--code-highlight': codeHighlight,
          '--code-bg': darkAccent,
          '--icon-info': 'url(/icons/note-light.svg)',
          '--icon-arrow': 'url(/icons/arrow-light.svg)',
          '--icon-spotify': 'url(/icons/spotify-light.svg)',
          '--icon-external': 'url(/icons/external-link-dark.svg)',
          '--icon-download': 'url(/icons/download-dark.svg)',
          '--icon-time': 'url(/icons/time-dark.svg)',
          '--icon-email': 'url(/icons/email-dark.svg)',
          '--icon-clipboard': 'url(/icons/clipboard-light.svg)',
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
          borderTop: '1px solid var(--color-accent-neutral)',
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
            boxShadow: '0 0 0 2px var(--color-primary)',
            outline: 'none',
            '@media(max-width: 480px)': {
              boxShadow: 'none',
            }
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
          color: 'var(--color-primary)',
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
          color: 'var(--color-primary)',
          cursor: 'pointer',
        },
        '.icon': {
          WebkitTransformStyle: 'preserve-3d',
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
              fontSize: 30,
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
          minHeight: 42,
          marginRight: '.6rem',
          marginBottom: '.6rem',
          padding: '.4rem 1rem',
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
          'span': {
            marginLeft: 100,
          },
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
            background: 'var(--color-primary)',
          },
          '&.disabled': {
            cursor: 'pointer',
            background: 'transparent',
            color: 'var(--color-text)',
            '&:hover': {
              background: 'transparent',
            },
          },
          '&.external:after, &.download:after, &.time:after, &.email:after, &.clipboard:after': {
            marginLeft: 4,
            content: '""',
            display: 'inline-block',
            width: 16,
            height: 16,
          },
          '&.external:after': {
            background: 'var(--icon-external) no-repeat',
            backgroundSize: 'contain',
          },
          '&.download:after': {
            background: 'var(--icon-download) no-repeat',
            backgroundSize: 'contain',
          },
          '&.time:after': {
            background: 'var(--icon-time) no-repeat',
            backgroundSize: 'contain',
          },
          '&.email:after': {
            background: 'var(--icon-email) no-repeat',
            backgroundSize: 'contain',
          },
          '&.clipboard': {
            border: '1px solid var(--color-accent-neutral)',
            '&:after': {
              background: 'var(--icon-clipboard) no-repeat',
              backgroundSize: 'contain',
            }
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
          background: 'var(--color-accent-neutral)',
          color: 'var(--color-text)',
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
      }}/>
    </>
  )
}


