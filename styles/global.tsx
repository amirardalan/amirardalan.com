import "@fontsource/poppins/700.css"
import "@fontsource/poppins/900.css"
import "@fontsource/lora/500.css"
import "@fontsource/lora/500-italic.css"
import "@fontsource/fira-code/400.css"
import { css, Global, useTheme } from '@emotion/react'

export function GlobalStyles () {
  const theme : any = useTheme()
  return (
    
    <Global
      styles={css`

        // Reset
        html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, 
        pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, 
        strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, 
        legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, 
        details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, 
        time, mark, audio, video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          vertical-align: baseline;
        }

        article,aside,details,figcaption,figure, footer,header,hgroup,menu,nav,section { 
          display: block;
        }

        nav ul {
          list-style: none;
        }

        blockquote, q {
          quotes: none;
        }

        blockquote:before, blockquote:after, q:before, q:after {
          content: '';
          content: none;
        }

        a {
          margin: 0;
          padding: 0;
          font-size: 100%;
          vertical-align: baseline;
          background: transparent;
        }

        ins {
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text};
          text-decoration: none;
        }

        mark {
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text};
          font-style: italic;
          font-weight: bold;
        }

        del {
          text-decoration: line-through;
        }

        abbr[title], dfn[title] {
          border-bottom: 1px dotted;
          cursor: help;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        hr {
          display: block;
          height: 1px;
          border: 0;   
          border-top: 1px solid ${theme.colors.grayscale};
          margin: 3em 0;
          padding: 0;
        }

        input, select {
          vertical-align: middle;
        }

        // Base
        html,
        body {
          background-color: ${theme.colors.background};
          font-family: ${theme.fonts.primary};
          color: ${theme.colors.text};
          -webkit-text-size-adjust: 100%;
          transition: all 0.15s linear;
        }

        * {
          margin:0;
          padding:0;
          box-sizing: border-box;
          &:before,
          &:after {
              box-sizing: border-box;
          }
        }
        
        h1 {
          margin: 0;
          padding: 0;
        }

        a {
          color: ${theme.colors.link};
          text-decoration: none;
        }
          
        p {
          margin: 0;
          padding: 0;
          line-height: 1.8rem;
        }

        ul, li {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        button,
        input,
        textarea {
          font-family: ${theme.fonts.primary}
        }

        a {
          text-decoration: underline;
          &:hover {
            text-decoration: none;
          }
        }

        input[type='text'],
        textarea {
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.5rem;
          background-color: ${theme.colors.accent};
          border: 2px solid ${theme.colors.accent};
          border-radius: 0.25rem;
          color: ${theme.colors.text};
          font-size: 16px;

          &:disabled {
            background-color: ${theme.colors.disabledInput};
            color: ${theme.colors.grayscale}
          }

          @media (max-width: 890px) {
            width: 100%;
          }
        }

        // Header + Nav
        .header {
          height: auto;
          margin-bottom: 1.8rem;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 5;
          a { text-decoration: none; }
          .headerRight {
            display: flex;
            flex-direction: row;
            align-items: center;

            @media (max-width: 768px) {
              flex-direction: row-reverse;
            }
          }
        }

        .nav {
          position: relative;
          &.active {
            &::before {
              position: absolute;
              content: '>';
              left: -10px;
            }
          }
          @media (max-width: 768px) {
            &.active {
              &::before {
                position: absolute;
                content: '>';
                left: -30px;
              }
              &:hover {
              &::before {
                position: absolute;
                content: '>';
                left: -30px;
              }
            }
            }
            &:hover {
              &::before {
                position: absolute;
                content: '';
                left: -30px;
              }
            }
          }
        }

        // Layout
        .container {
          padding: 2rem 5% 0 5%;
          position: relative;

          @media (max-width: 890px) {
            padding: 5% 5% 0 5%;
          }
        }

        // Special Text
        ::-moz-selection {
          background: ${theme.colors.selection};
          color: ${theme.colors.selectionText};
        }
        ::selection {
          background: ${theme.colors.selection};
          color: ${theme.colors.selectionText};
        }

        // Animation
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate3d(0, 100%, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes rotate {
          100% { transform: rotate(360deg) }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }

      `}
    />
  )
}


