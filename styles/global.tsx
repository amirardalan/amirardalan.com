import { css, Global, useTheme } from '@emotion/react'

export function GlobalStyles () {
  const theme : any = useTheme()
  return (
    
    <Global
      styles={css`

        // Base
        html,
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
          padding: 0;
          margin: 0;
          transition: all 0.25s linear;
        }

        * {
          box-sizing: border-box;
          &:before,
          &:after {
              box-sizing: border-box;
          }
        }
        
        h1 {
          padding: 0;
          margin: 0;
        }

        a {
          color: ${theme.colors.link};
          text-decoration: none;
          text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
        }
          
        p {
          margin: 0;
          padding: 0;
        }

        // Layout
        .header {
          margin-bottom: 1.8rem;
          height: auto;
          display: flex;
          justify-content: space-between;
          animation: fade-in 3s forwards;
          
          a { text-decoration: none; }
        }

        .container {
          padding: 1.6% 5% 0 5%;

          @media (max-width: 890px) {
            padding: 5% 5% 0 5%;
          }
        }

        main {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .mainLeft {
          display: flex;
          flex-direction: column;
          align-self: flex-end;
          justify-content: space-between;
          animation: slide-up .8s forwards;

          h2 { margin-top: 0; }
          h3, h4 {
            margin: 0;
            padding: 0;
          }
          
          h3,
          h3 p {
            font-size: calc(1.2vw + 1.2vh);

            @media (max-width: 890px) {
              font-size: calc(1.9vw + 1.9vh);
            }
          }

          h4 {
            line-height: 1.3rem;
            font-size: 15px;
            font-weight: 400;
            color: ${theme.colors.footer};

            a { font-weight: 700; }
          }

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
          cursor: crosshair;
          position: relative;
          display: flex;
          height: 75vh;
          width: 50%;
          flex-direction: column;
          align-self: flex-end;
          animation: slide-up 1s forwards;
          align-items: center;
          justify-content: center;
          /* background-color: ${theme.canvas.bg}; */
          /* transition: background-color .5s linear; */

          @media (max-width: 890px) {
            align-self: flex-start;
            width: 100%;
            margin-top: 2rem;
            height: 45vh;
          }
        }

        // Three.js Canvas
        .canvasTitle {
          color: ${theme.colors.text};
          position: absolute;
          display: flex;
          font-size: calc(2.8vw + 2.8vh);
          min-height: 0vw;
          line-height: 7rem;
          padding: 0 2rem;
          animation: ${theme.canvas.textAnim};
          margin: 0;
          padding: 0;
          z-index: 1;
          transition: color 3s linear;
        }

        .canvasControls {
          position: absolute;
          bottom: 0;
          left: 20px;
          z-index: 2;
          color: ${theme.colors.textLight};
          font-size: 10px;
          font-weight: 300;
          text-transform: uppercase;
          animation: fade-out .2s forwards;

          .mainRight:hover & {
            animation: fade-in .2s forwards;
          }
        }

        // Special Text
        ::-moz-selection {
          color: ${theme.colors.selectionText};
          background: ${theme.colors.selection};
        }
        ::selection {
          color: ${theme.colors.selectionText};
          background: ${theme.colors.selection};
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

        // Animation
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translate3d(0, 100%, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translate3d(0, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 100%, 0); }
        }

        @keyframes slide-left {
          from { opacity: 0; transform: translate3d(100%, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes slide-right {
          from { opacity: 1; transform: translate3d(0, 0, 0); }
          to { opacity: 0; transform: translate3d(100%, 0, 0); }
        }

      `}
    />
  )
}


