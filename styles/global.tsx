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
          text-decoration: underline;
            &:hover {
              text-decoration: none;
            }
        }
          
        p {
          margin: 0;
          padding: 0;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
          background-color: ${theme.colors.disabled};
          background-color: ${theme.colors.divider};
          color: ${theme.colors.text};
          border: 2px solid ${theme.colors.divider};

          &:disabled {
            background-color: ${theme.colors.disabled};
            color: ${theme.colors.footer}
          }

          @media (max-width: 890px) {
            width: 100%;
          }
        }

        // Buttons
        .buttonCta {
          min-width: 128px;
          margin: 0 1rem 2rem 0;
          cursor: pointer;
          padding: 1.2rem 1.8rem;
          background-color: transparent;
          border: 4px solid ${theme.colors.link};
          color: ${theme.colors.link};
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 4px 4px 0 ${theme.colors.link};
          transition: background-color .2s linear;
          &:hover {
            background: ${theme.colors.link};
            border: 4px solid transparent;
            color: ${theme.colors.highlight};
            box-shadow: 4px 4px 0 ${theme.colors.linkLight};
            transition: background-color .2s linear;
          }
        }

        .linkCta {
          display: block;
          width: max-content;
          font-size: 16px;
          cursor: pointer;
          text-decoration: none;
          &::before {
            content: '📄';
            box-shadow: #8b8b8b;
            padding-right: .5rem;
          }
        }

        .buttonCompact {
          background-color: ${theme.colors.text};
          border: 1px solid ${theme.colors.divider};
          border-radius: 5px;
          cursor: pointer;
          padding: .5rem .8rem;
          color: ${theme.colors.background};
          font-size: 12px;
          font-weight: bold;
          a& {
            &:hover {
              color: ${theme.colors.background};
            }
          }
          &.delete {
            background-color: #8b8b8b;
            text-decoration: none;
            &:hover {
              background-color: #f84040;
            }
          }
          &:hover {
            background-color: ${theme.colors.footer};
          }
          &:disabled {
            background-color: ${theme.colors.footer};
            cursor: default;
          }
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

        // Blog Styles
        .breadcrumbs {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: ${theme.colors.footer};
          font-size: 12px;
          &::before {
            display: flex;
            content: '📔';
            font-size: 20px;
            padding-right: .5rem;
          }
          a { text-decoration: none;
            &::after {
              content: '/';
              margin: 0 .5rem;
              color: ${theme.colors.footer};
            }
          }
          @media (max-width: 480px) {
            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .blog {
          width: 768px;
          margin: 0 auto;

          @media (max-width: 768px) {
            width: 98%;
          }
          h2 {
            display: inline-block;
            font-size: 35px;
            margin: 0;
          }
          p {
            font-family: 'Lora', 'Times New Roman', Times, serif;
            font-size: 18px;
          }
          small {
            color: ${theme.colors.footer};
            display: block;
          }
          main {
            display: flex;
            flex-direction: column;
          }
          .postDetails {
            margin: .5rem 0 .2rem;
            display: block;
            color: ${theme.colors.footer};
            font-size: 12px;
          }
          .controlsPost {
            margin: 2rem 0;
          }
          .controlsConfirm {
            margin-top: 1rem;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            color: #f84040;
            .confirmLink {
              margin-right: .5rem;
              cursor: pointer;
              font-weight: normal;
              color: ${theme.colors.text};
              &:hover {
                color: ${theme.colors.link};
                &:first-of-type::after {
                  color: ${theme.colors.footer}
                }
              }
              &:first-of-type {
                &::after {
                  content: '|';
                  padding-left: .5rem;
                  color: ${theme.colors.footer}
                }
              }
            }
          }
          .drafts {

            @media (max-width: 890px) {
              max-width: none;
            }
          }
          .postDraft {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            background-color: ${theme.colors.divider};
            border-radius: 15px;
            padding: 1rem;
            h2 { font-size: calc(1vw + 1vh); }
            .postTeaser { margin: 0; }

            &::after {
              content: 'Unpublished';
              text-transform: uppercase;
              font-weight: bold;
              font-size: 12px;
              align-self: right;
            }
          }
          .postTeaser {
            margin: 2.5rem 0 .5rem 0;
            h2 {
              cursor: pointer;
              text-decoration: underline;
              &:hover {
                text-decoration: none;
              }
            }
            @media (max-width: 890px) {
              margin: 2rem 0 2rem 0;
            }
          }
          .postFull {
            margin: 2rem 0;
            p {
              margin-top: 2rem;
            }
            @media (max-width: 890px) {
              margin: 2.5rem 0;
            }
          }
          .postFull {
            p, ul, li, a {
              font-family: 'Lora', Georgia, 'Times New Roman', Times, serif;
              font-size: 18px;
              line-height: 1.8rem;
            }
            ul, li, a {
              margin-bottom: 1rem;
            }
            p { margin-bottom: 2rem; }
            a { text-decoration: underline;
              &:hover { text-decoration: none; }
            }
            blockquote {
              margin-left: -1.75rem;
              font-family: 'Lora', 'Times New Roman', Times, serif;
              border-left: 5px solid ${theme.colors.footer};
              color: ${theme.colors.footer};
              padding-left: 1.5rem;
              font-style: italic;
              & blockquote {
                border-left: 5px solid ${theme.colors.textLight};
                padding-left: 3rem;
                margin-left: 1rem;
              }
              @media (max-width: 890px) {
                margin-left: -1.1rem;
                padding-left: .8rem;
              }
              p { font-size: 24px; }
            }
          }
          .postDraft,
          .postTeaser,
          .postFull {
            @media (max-width: 1280px) {
              max-width: none;
            }
          }
          // Special Delete (non)Button
          .formSubmit {
            a {
              padding: .44rem 0.8rem;
              &:hover { background-color: #f84040 }
            }
          }
        }

        .prevLink {
          display: flex;
          justify-content: flex-start;
        }
        .nextLink {
          display: flex;
          justify-content: flex-end;
        }

        .prevLink,
        .nextLink {
          font-family: 'Lora', Georgia, 'Times New Roman', Times, serif;
          font-size: 18px;
          @media(max-width: 600px) {
            justify-content: flex-start;
          }
        }

        // Flex Utils
        .center {
          display: flex;
          justify-content: center;
        }

        // Markdown Code
        code, code p {
          border-radius: 5px;
          padding: .5rem;
          font-size: 15px;
          background-color: ${theme.colors.text};
          color: ${theme.colors.background};
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
          background: ${theme.colors.text};
          color: ${theme.colors.background};
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


