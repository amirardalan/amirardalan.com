import { Global, useTheme } from '@emotion/react'

export function GlobalStyles () {
  
  const theme : any = useTheme()

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
          backgroundColor: theme.colors.accent,
          color: theme.colors.text,
          textDecoration: 'none',
        },
        mark: {
          backgroundColor: theme.colors.accent,
          color: theme.colors.text,
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
          borderTop: '1px solid' + theme.colors.grayscale,
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
          backgroundColor: theme.colors.background,
          fontFamily: theme.fonts.primary,
          color: theme.colors.text,
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
        a: {
          margin: 0,
          padding: 0,
          fontSize: '100%',
          verticalAlign: 'baseline',
          background: 'transparent',
          color: theme.colors.link,
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
          fontFamily: theme.fonts.primary
        },
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
          background: theme.colors.selection,
          color: theme.colors.selectionText,
        },
        '::selection': {
          background: theme.colors.selection,
          color: theme.colors.selectionText,
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


