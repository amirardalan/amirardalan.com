import { css, Global, useTheme } from '@emotion/react'
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"

export function GlobalStyles () {
  const theme = useTheme()
  return (
    <>
    <Global
        styles={css`
          html,
          body {
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            font-family: 'Roboto';
            padding: 0;
            margin: 0;
            transition: all 0.25s linear;
          }
          a {
            color: ${theme.colors.link};
            text-decoration: none;
          }
          * {
            box-sizing: border-box;
          }
          @keyframes fade {
            0% { opacity: 0; }
            33% { opacity: 0; }
            66% { opacity: 0; }
            100% { opacity: 1; }
          }
          .highlight {
            background: ${theme.colors.highlightBg};
            color: ${theme.colors.highlight};
            padding: 0 .2rem;
          }
          .code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, 
            Bitstream Vera Sans Mono, Courier New, monospace;
          }
          h1 {
            color: ${theme.colors.text};
            font-size: 10px;
            font-weight: 300;
            padding-bottom: .5em;
            margin-bottom: 2em;
            text-transform: uppercase;
            border-bottom: 8px solid ${theme.colors.text};
            width: fit-content;
    
            a {
              color: inherit;
            }
          }
          .header {
            height: auto;
            display: flex;
            justify-content: flex-start;
          }
          .toggleButton {
            cursor: pointer;
            animation: fade 4s;
            -webkit-animation: fade 4s;
            display: flex;
            
            span {
              font-size: 10px;
              text-transform: uppercase;
              padding: .7rem 1rem 0 .5rem;
            }
          }
          .container {
            padding: 2% 5% 0 5%;
          }
          main {
            margin: 1rem 0 2rem;
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .content {
            margin: 0;
            line-height: 1.15;
            font-size: calc(2vw + 2vh);
            font-weight: 700;
            animation: fade 2s;
            -webkit-animation: fade 2s;
    
            @media (max-width: 890px) {
              flex: 100%;
            }
            a {
              text-decoration: none;
              &:hover,
              &:focus,
              &:active {
                text-decoration: underline;
              }
            }
          }
          .mainLeft {
            display: flex;
            flex-direction: column;
            align-self: flex-end;
            justify-content: space-between;
    
            @media (max-width: 890px) {
              width: 100%;
              justify-content: start;
              align-self: flex-start;
              margin-right: 0;
              flex-direction: column-reverse;
              height: auto;
            }
          }
          .mainRight {
            position: relative;
            background-color: ${theme.colors.divider};
            display: flex;
            height: 75vh;
            width: 50%;
            flex-direction: column;
            align-self: flex-end;
            animation: fade 3s;
            -webkit-animation: fade 3s;
    
            h4 {
              position: absolute;
              bottom: 0;
              left: 20px;
              z-index: 2;
              font-size: 10px;
              font-weight: 300;
              text-transform: uppercase;
    
              // Hide when Orbital Controls are disabled
              @media (max-width: 1024px) {
                display: none;
              }
            }
    
            @media (max-width: 890px) {
              align-self: flex-start;
              width: 100%;
              margin-top: 2rem;
              height: 45vh;
            }
    
          }
          footer {
            color: ${theme.colors.footer};
            width: 100%;
            height: 100px;
            line-height: 2em;
            border-top: 1px solid ${theme.colors.divider};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: .8rem;
            font-weight: 600;
            padding: 1em;
            a {
              color: ${theme.colors.footerLink};
              padding: 0 .3em;
    
              &:hover {
                text-decoration: underline;
              }
            }
            div {
              flex-direction: row;
            }
            .small {
              font-size: .75rem;
              span {
                color: ${theme.colors.footerLink};
              }
            }
          }
        `}
      />
    </>
  )
}


