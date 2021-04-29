import { css, Global } from '@emotion/react'

export const globalStyles = (
  <Global
    styles={css`
      @font-face {
        font-family: 'Roboto';
        src: url('<https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap>') format("woff")
      }
      html,
      body {
        font-family: 'Roboto';
        padding: 0;
        margin: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
)



