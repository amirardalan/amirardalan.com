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
        color: black;
        font-size: 10px;
        font-weight: 300;
        padding-bottom: .5em;
        margin-bottom: 2em;
        text-transform: uppercase;
        border-bottom: 10px solid black;
        width: fit-content;
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
          padding: 3rem 0;
        }

        @media (max-width: 480px) {
          padding: 1rem 0;
        }
      }
      .logo {
        height: fit-content;
        margin-bottom: 1em;
        animation: fade 1.5s;
        -webkit-animation: fade 1.5s;
        flex-direction: column;

        @media (max-width: 890px) {
          order: 2;
          justify-content: space-between;
          flex-direction: row-reverse;
          display: flex;
          img {
            width: 60px;
            align-self: flex-end;
          }
        }
      }
      .title {
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
        position: relative;
        background-color: #eaeaea;
        display: flex;
        height: 100%;
        width: 50%;
        flex-direction: column;
        align-self: flex-end;
        animation: fade 2.5s;
        -webkit-animation: fade 2.5s;

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



