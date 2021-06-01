import { Global, css, useTheme } from '@emotion/react'

export default function BlogLayout(props) {

  const theme : any = useTheme()

  return (
    <>
      <Global
        styles={css`
          // Blog Styles
          .breadcrumbs {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: ${theme.colors.grayscale};
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
                color: ${theme.colors.grayscale};
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
              font-family: ${theme.fonts.secondary};
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
              font-family: ${theme.fonts.tertiary};
              font-size: 18px;
            }
            main {
              display: flex;
              flex-direction: column;
            }
          }

          .post {
            margin-top: 3rem;
          }

          .postDetails {
            margin: .6rem 0 .2rem;
            color: ${theme.colors.grayscale};
            font-size: 13px;

            @media (max-width: 480px) {
              font-size: 12px;
            }
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
            border: 1px solid ${theme.colors.accent};
            &::after {
              content: 'Draft';
              align-self: right;
              color: ${theme.colors.grayscale};
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
          }

          .postFull {
            h2 {
              text-decoration: none;
              cursor: default;
            }
            p { margin-top: 2rem; }
            p, ul, li, a, blockquote {
              font-family: ${theme.fonts.tertiary}
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
              border-left: 5px solid ${theme.colors.accent};
              color: ${theme.colors.grayscale};
              font-style: italic;
              font-weight: 400;
              & blockquote {
                margin-left: 0;
                padding-left: 1rem;
                border-left: 5px solid ${theme.colors.accent};
              }
              @media (max-width: 890px) {
                margin-left: -1.1rem;
                padding-left: .8rem;
              }
              p { font-size: 24px; }
            }
            ul li {
              list-style: outside;
              margin-left: 2rem;
              padding-left: .5rem;
              
              @media (max-width: 480px) {
                margin-left: 1.5rem;
              }
            }
            ol {
              li {
                list-style-type: decimal;
                margin-left: 2rem;
                padding-left: .5rem;
              }
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
            @media(max-width: 768px) {
              flexDirection: column;
            }
          }
          .prevLink {
            display: flex;
            text-align: left;
            margin-right: 1rem;
          }
          .nextLink {
            display: flex;
            text-align: right;
          }
          .prevLink,
          .nextLink {
            font-family: ${theme.fonts.tertiary};
            font-size: 18px;
          }

          // Flex Utils
          .center {
            display: flex;
            justify-content: center;
          }

          // Markdown Code
          pre,
          code {
            background-color: #2a2734;
            border-radius: 5px;
            color: ${theme.colors.background};
          }
          code {
            word-wrap: break-word;
          }
          pre {
            border: 1px solid ${theme.colors.accent};
            padding: 1rem;
            line-height: 2rem;
            code {
              word-wrap: normal;
            }
          }
          code, code p {
            padding: 0.2rem;
            background-color: ${theme.colors.accent};
            color: ${theme.colors.text};
            font-size: 15px;
          }
          .codeStyle {
            code {
              padding: 0;
            }
          }
          .language-bash {
            .codeStyle & {
              pre & {
                span.linenumber { display: none !important; }
              }
            }
          }
        `}
      />
      <div className="layout">
        {props.children}
      </div>
    </>
  )

}
