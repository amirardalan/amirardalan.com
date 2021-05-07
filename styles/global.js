import { css, Global, useTheme } from '@emotion/react'
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/700.css"

export function GlobalStyles () {
  const theme = useTheme()
  return (
    
    <Global
      styles={css`

        // Base Styles
        html,
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: 'Poppins';
          padding: 0;
          margin: 0;
          transition: all 0.25s linear;
        }

        * {
          box-sizing: border-box;
        }
        
        h1 {
          padding: 0;
          margin: 0;
        }

        a {
          color: ${theme.colors.link};
          text-decoration: none;

          &:hover { text-decoration: underline; }
        }

        // Layout Styles
        .header {
          height: auto;
          display: flex;
          justify-content: space-between;
          animation: fade-in 3s forwards;
        }

        .container {
          padding: 2% 5% 0 5%;

          @media (max-width: 890px) {
            padding: 5% 5% 0 5%;
          }
        }

        main {
          margin: 1.8rem 0 2rem;
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
          background-color: ${theme.colors.divider};
          display: flex;
          height: 75vh;
          width: 50%;
          flex-direction: column;
          align-self: flex-end;
          animation: slide-up 1s forwards;
          align-items: center;
          justify-content: center;

          @media (max-width: 890px) {
            align-self: flex-start;
            width: 100%;
            margin-top: 2rem;
            height: 45vh;
          }
        }

        // Special Text Styles
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

        // Animation Styles
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes slide-up {
          0% { opacity: 0; transform: translate3d(0, 100%, 0); }
          98% { opacity: 1; }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes slide-down {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          98% { opacity: 1; }
          100% { transform: translate3d(0, 100%, 0); }
        }

        @keyframes slide-left {
          0% { opacity: 0; transform: translate3d(100%, 0, 0); }
          98% { opacity: 1; }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes slide-right {
          0% { opacity: 1; transform: translate3d(0, 0, 0); }
          90% { opacity: 0; }
          100% { opacity: 0; transform: translate3d(100%, 0, 0); }
        }

        // Three.js Canvas Styles
        .canvasTitle {
            position: absolute;
            display: flex;
            font-size: calc(4vw + 4vh);
            padding: 0 2rem;
            animation: slide-up 3s forwards;
            margin: 0;
            padding: 0;
            /* z-index: 1; */
          }

          &:hover {
            .canvasControls{
              animation: fade-in .2s forwards;
            }
          }

          .canvasControls {
            position: absolute;
            bottom: 0;
            left: 20px;
            z-index: 2;
            color: whitesmoke;
            font-size: 10px;
            font-weight: 300;
            text-transform: uppercase;
            animation: fade-out .2s forwards;

            // Disable Drei Orbit Controls on mobile
            @media (max-width: 1024px) {
              display: none;
            }
          }

      `}
    />
  )
}


