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
          font-size: 15px;
          font-family: Menlo, Monaco, 'Courier New', monospace;

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
          flex-direction: row;
          display: flex;
          align-items: center;
          margin: 0 1rem 2rem 0;
          cursor: pointer;
          padding: 1rem 1.4rem;
          background-color: transparent;
          border: 4px solid ${theme.colors.link};
          color: ${theme.colors.link};
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
          font-size: 15px;
          font-weight: bold;
          box-shadow: 4px 4px 0 ${theme.colors.link};
          letter-spacing: .02rem;
          transition: background-color .2s linear;
          &:hover {
            background: ${theme.colors.link};
            border: 4px solid transparent;
            color: ${theme.colors.highlight};
            box-shadow: 4px 4px 0 ${theme.colors.linkLight};
            transition: background-color .2s linear;
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
              background-color: #ff6262;
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

          h2 {
            margin: 0 0 1rem;
            font-weight: bolder;
          }
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

        .cta {
          display: flex;
          flex-direction: row;
        }

        .latestPost {
          line-height: 1.8rem;
          p, a {
            font-family: 'Lora', 'Times New Roman', Times, serif;
          }
          a{
            font-size: 18px;
            color: ${theme.colors.text};
            text-decoration: underline;
            &:hover {
              text-decoration: none;
            }
          }
          p {
            color: ${theme.colors.footer};
            font-size: 15px;
          }
          h4 {
            margin: 0;
            font-size: 20px;
            font-weight: lighter;
            color: ${theme.colors.text};
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
          color: ${theme.colors.text};
          font-size: 10px;
          font-weight: normal;
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
          font-size: 13px;
          font-weight: lighter;
          &::before {
            display: flex;
            content: '📋';
            color: ${theme.colors.link};
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
          max-width: 768px;
          margin: 0 auto;
          
          @media (max-width: 480px) {
            padding: 0 1%;
          }

          h2 {
            display: inline-block;
            line-height: 2.5rem;
            font-size: 30px;
            font-weight: 900;
            margin: 0;
            cursor: pointer;
            text-decoration: underline;
            &:hover { text-decoration: none; }
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
        }

        .post {
          margin-top: 2rem;
        }

        .postDetails {
          margin: .5rem 0 .2rem;
          display: block;
          font-size: 13px;
          font-weight: lighter;
        }

        .controlsPost {
          margin: 2rem 0;
        }
        
        .controlsConfirm {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: .5rem 0;
          font-size: 12px;
          font-weight: lighter;
          text-transform: uppercase;
          .confirmSelect {
            margin-left: .5rem;
          }
          .confirmLink {
            text-transform: none;
            margin-right: .5rem;
            cursor: pointer;
            font-weight: bold;
            color: ${theme.colors.text};
            &.delete {
              color: ${theme.colors.text};
              &:hover { color:#ff6262 }
            }
            &.close {
              font-size: 20px;
                &:hover {
                color: ${theme.colors.footer}
              }
            }
          }
        }

        .postDraft {
          display: flex;
          justify-content: space-between;
          border: 1px solid ${theme.colors.divider};
          padding: 1.8rem;
          margin: 1rem 0 .5rem;
          &::after {
            content: 'unpublished';
            color: ${theme.colors.footer};
            font-weight: bold;
            font-size: 12px;
            align-self: right;
          }
          @media (max-width: 480px) {
            &::after { content: '' }
            h2 {
              line-height: 1.5rem;
              font-size: 20px;
            }
          }
          .postTeaser {
            margin: 0 .5rem;
          }
        }

        .postFull {
          h2 {
            text-decoration: none;
            cursor: default;
          }
          p { margin-top: 2rem; }
          p, ul, li, a, blockquote {
            font-family: 'Lora', Georgia, 'Times New Roman', Times, serif;
          }
          h3 {
            font-size: 28px;
            font-weight: bold;
          }
          p, ul, li, a {
            font-size: 18px;
            line-height: 1.8rem;
          }
          ul, li, a { margin-bottom: 1rem; }
          p { margin-bottom: 2rem; }
          a { text-decoration: underline;
            &:hover { text-decoration: none; }
          }
          blockquote {
            margin-left: -1.75rem;
            border-left: 5px solid ${theme.colors.footer};
            color: ${theme.colors.footer};
            padding-left: 1.5rem;
            font-style: italic;
            & blockquote {
              border-left: 5px solid ${theme.colors.textLight};
              padding-left: 1rem;
              margin-left: 0;
            }
            @media (max-width: 890px) {
              margin-left: -1.1rem;
              padding-left: .8rem;
            }
            p { font-size: 24px; }
          }
        }

        // Special Delete (non)Button
        .formSubmit {
          a { padding: .44rem 0.8rem; }
          a.delete { &:hover { background-color: #ff6262 }
          }
        }

        // Next Prev Controls
        .nextPrevControls {
          display: flex;
          justify-content: space-between;
          a {
            text-decoration: underline;
            &:hover {
              text-decoration: none;
            }
          }
          @media(max-width: 600px) {
            flexDirection: column;
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
        pre,
        code {
          font-family: Menlo, Monaco, 'Courier New', monospace;
          background-color: ${theme.colors.text};
          color: ${theme.colors.background};
          border-radius: 5px;
        }
        pre {
          overflow: scroll;
          line-height: 2rem;
          padding: 1rem;
        }
        code, code p {
          padding: .2rem;
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


