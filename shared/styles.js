import { css, Global } from '@emotion/react'

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        font-family: 'Roboto';
        padding: 0;
        margin: 0;
      }
      a {
        color: #00cec9;
        text-decoration: none;
      }
      * {
        box-sizing: border-box;
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
        color: black;
        font-size: 12px;
        font-weight: 300;
        padding-bottom: .5em;
        text-transform: uppercase;
        border-bottom: 10px solid black;
        width: fit-content;
      }
      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        justify-content: space-between;

        @media (max-width: 890px) {
          padding: 3rem 0;
        }

        @media (max-width: 480px) {
          padding: 1rem 0;
        }
      }
      .mainLeft {
        display: flex;
        height: 100%;
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
        background-color: #eaeaea;
        display: flex;
        height: 100%;
        width: 50%;
        flex-direction: column;
        align-self: flex-end;

        @media (max-width: 890px) {
          align-self: flex-start;
          width: 100%;
          height: 50vh;
        }
      }
      .logo {
        cursor: pointer;
        height: fit-content;
        margin-bottom: 1em;
  
        @media (max-width: 890px) {
          order: 2;
          justify-content: right;
        }
        @media (max-width: 480px) {
          width: 3rem;
        }
      }
      .title {
        margin: 0;
        line-height: 1.15;
        font-size: calc(2vw + 2vh);
        font-weight: 700;

        @media (max-width: 890px) {
          flex: 100%;
          margin-bottom: 1rem;
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
      footer {
        color: #ccc;
        width: 100%;
        height: 100px;
        line-height: 2em;
        border-top: 1px solid #eaeaea;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: .8rem;
        font-weight: 600;
        padding: 1em;
        a {
          color: #666;
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
            color: #666;
          }
        }
      }
      .gray {
        color: #999;
      }
    `}
  />
)



