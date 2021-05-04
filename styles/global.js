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
          .code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, 
            Bitstream Vera Sans Mono, Courier New, monospace;
          }
          .container {
            min-height: 100vh;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
          h4 {
            font-size: 10px;
            font-weight: 300;
            text-transform: uppercase;
          }
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            width: 90%;
            justify-content: space-between;
    
            @media (max-width: 890px) {
              padding: 1.6rem 0;
            }
          }
          .header {
            height: fit-content;
            margin-bottom: 1em;
            animation: fade .8s;
            -webkit-animation: fade .8s;
            flex-direction: column;
    
            @media (max-width: 890px) {
              order: 2;
              justify-content: space-between;
              flex-direction: row-reverse;
              display: flex;
              img {
                display: none !important;
                width: 60px;
                align-self: flex-end;
              }
            }
          }
          .toggleButton {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            position: absolute;
            top: 1.3rem;
            right: 5%;
            img {
              transform: rotate(-30deg);
            }
            span {
              font-size: 10px;
              text-transform: uppercase;
              padding: .7rem 1rem 0 0;
            }
          }
          .content {
            margin: 0;
            line-height: 1.15;
            font-size: calc(2vw + 2vh);
            font-weight: 700;
            animation: fade 1.3s;
            -webkit-animation: fade 1.3s;
    
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
            height: 75vh;
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
            animation: fade 2s;
            -webkit-animation: fade 2s;
    
            h4 {
              position: absolute;
              left: 20px;
              z-index: 2;
    
              // Hide when Orbital Controls are disabled
              @media (max-width: 1024px) {
                display: none;
              }
            }
    
            @media (max-width: 890px) {
              align-self: flex-start;
              width: 100%;
              height: 50vh;
              margin-top: 2rem;
            }
            
            @media (max-width: 480px) {
              margin-top: 1rem;
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


