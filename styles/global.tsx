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

        // Base
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: ${theme.colors.background};
          font-family: 'Fira Code', Menlo, Monaco, 'Courier New', monospace;
          color: ${theme.colors.text};
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
        }

        ul, li {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        button,
        a,
        input,
        textarea {
          font-family: 'Fira Code', Menlo, Monaco, 'Courier New', monospace;
        }

        input[type='text'],
        textarea {
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.5rem;
          background-color: ${theme.colors.divider};
          border: 2px solid ${theme.colors.divider};
          border-radius: 0.25rem;
          color: ${theme.colors.text};
          font-size: 16px;

          &:disabled {
            background-color: ${theme.colors.disabledInput};
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
          padding: .5rem 1.4rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.text};
          border: 4px solid transparent;
          border-radius: 5px;
          color: ${theme.colors.background};
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background-color: ${theme.colors.footer};
            color: ${theme.colors.background};
          }
        }

        a.buttonCompact,
        input.buttonCompact,
        .buttonCompact {
          min-width: 80px;
          margin: 0 .25rem 0 0;
          padding: .45rem 0;
          display: inline-block;
          background-color: ${theme.colors.text};
          border: 1px solid ${theme.colors.divider};
          border-radius: 5px;
          color: ${theme.colors.background};
          font-size: 12px;
          text-transform: uppercase;
          text-align: center;
          cursor: pointer;
          &:hover {
            background-color: ${theme.colors.footer};
          }
          &:disabled {
            background-color: ${theme.colors.disabledBtn};
            cursor: default;
          }
          &:last-child {
            margin: 0;
          }
          .create & {
            &.createBtn {
              background-color: #8b8b8b;
            }
          }
          .drafts & {
            &.draftsBtn {
              background-color: #8b8b8b;
            }
          }
          &.delete {
            background-color: #8b8b8b;
            text-decoration: none;
            &:hover {
              background-color: #ff6262;
            }
          }
        }

        // Layout
        .header {
          height: auto;
          margin-bottom: 1.8rem;
          display: flex;
          justify-content: space-between;
          animation: fade-in 3s forwards;
          position: relative;
          z-index: 5;
          a { text-decoration: none; }
          .headerRight {
            display: flex;
            flex-direction: row;
            align-items: center;

            @media (max-width: 600px) {
              flex-direction: row-reverse;
            }
          }
        }

        .nav {
          position: relative;
          &.active,
          &:hover {
            &::before {
              position: absolute;
              content: '>';
              left: -10px;
            }
          }
          @media (max-width: 600px) {
            &.active,
            &:hover {
              &::before {
                position: absolute;
                content: '>';
                left: -30px;
              }
            }
          }
        }

        .container {
          padding: 2rem 5% 0 5%;
          position: relative;

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

          h2, h3, p {
            font-family: 'Poppins', Arial, Arial, Helvetica, sans-serif;
          }
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
            color: ${theme.colors.footer};
            font-size: 12px;
            line-height: 1.3rem;

          }

          @media (max-width: 890px) {
            width: 100%;
            height: auto;
            margin-right: 0;
            flex-direction: column-reverse;
            justify-content: start;
            align-self: flex-start;
          }
        }

        .mainRight {
          width: 50%;
          height: 75vh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-self: flex-end;
          cursor: crosshair;
          animation: slide-up 1s forwards;

          @media (max-width: 890px) {
            width: 100%;
            height: 45vh;
            margin-top: 2rem;
            align-self: flex-start;
          }
        }

        .cta {
          display: flex;
          flex-direction: row;
        }

        .latestPost {
          padding-left: 1.2rem;
          border-left: 7px solid ${theme.colors.divider};
          font-weight: normal;
          line-height: 1.8rem;
          h4 {
            font-weight: normal;
          }
          p, a {
            font-family: 'Lora', 'Times New Roman', Times, serif;
          }
          a{
            color: ${theme.colors.text};
            font-size: 18px;
            text-decoration: underline;
            &:hover {
              text-decoration: none;
            }
          }
          p {
            color: ${theme.colors.footer};
            font-size: 15px;
          }
        }

        // Three.js Canvas
        .canvasTitle {
          margin: 0;
          padding: 0 2rem;
          min-height: 0vw;
          position: absolute;
          display: flex;
          color: ${theme.colors.text};
          font-size: calc(2.8vw + 2.8vh);
          line-height: 7rem;
          animation: ${theme.canvas.textAnim};
          transition: color 3s linear;
        }

        .canvasControls {
          position: absolute;
          bottom: 0;
          left: 20px;
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
          &::before {
            padding-right: .5rem;
            display: flex;
            content: '📋';
            color: ${theme.colors.link};
            font-size: 20px;
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
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }

        .blog {
          max-width: 768px;
          margin: 0 auto;
          
          @media (max-width: 480px) {
            margin: 0 1%;
          }
          h2, h3, h4 {
            font-family: 'Poppins', Arial, Arial, Helvetica, sans-serif;
          }
          h2 {
            margin: 0;
            display: inline-block;
            line-height: 2.5rem;
            font-size: 38px;
            font-weight: 900;
            cursor: pointer;
            text-decoration: underline;
            &:hover { text-decoration: none; }
          }
          p {
            font-family: 'Lora', 'Times New Roman', Times, serif;
            font-size: 18px;
          }
          small {
            display: block;
            color: ${theme.colors.footer};
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
        }

        .controlsPost {
          margin: 2rem 0;
        }

        .formSubmit {
          margin-top: 1rem;
        }
        
        .controlsConfirm {
          margin: 1rem 0 0 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 12px;
          font-weight: lighter;
          text-transform: uppercase;
          .confirmLink {
            margin-right: .5rem;
            color: ${theme.colors.text};
            font-size: 12px;
            font-weight: bold;
            text-transform: none;
            cursor: pointer;
            &.delete {
              color: #ff6262;
            }
            &.close {
              margin-left: .5rem;
            }
            &.delete:hover,
            &.close:hover {
              text-decoration: underline;
            }
          }
        }

        .postDraft {
          margin: 1rem 0 .5rem;
          padding: 1.8rem;
          display: flex;
          justify-content: space-between;
          border: 1px solid ${theme.colors.divider};
          &::after {
            content: 'Draft';
            align-self: right;
            color: ${theme.colors.footer};
            font-size: 12px;
            font-style: italic;
          }
          @media (max-width: 480px) {
            padding: 1rem;
            &::after { content: '' }
            h2 {
              line-height: 2.1rem;
              font-size: 20px;
            }
          }
          .postTeaser {
            margin: 0 .5rem;
          }
        }

        .postTeaser {
          h2 { font-size: 30px; }
          animation: slide-up .5s forwards;
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
            margin: 3.5rem 0 0;
            padding: 0;
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
            padding-left: 1.5rem;
            border-left: 5px solid ${theme.colors.footer};
            color: ${theme.colors.footer};
            font-style: italic;
            & blockquote {
              margin-left: 0;
              padding-left: 1rem;
              border-left: 5px solid ${theme.colors.textLight};
            }
            @media (max-width: 890px) {
              margin-left: -1.1rem;
              padding-left: .8rem;
            }
            p { font-size: 24px; }
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
          background-color: ${theme.colors.text};
          border-radius: 5px;
          color: ${theme.colors.background};
        }
        pre {
          padding: 1rem;
          overflow: scroll;
          line-height: 2rem;
        }
        code, code p {
          padding: .2rem;
          background-color: ${theme.colors.text};
          color: ${theme.colors.background};
          font-size: 15px;
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
        .highlight {
          padding: 0 .2rem;
          background: ${theme.colors.text};
          color: ${theme.colors.background};
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


