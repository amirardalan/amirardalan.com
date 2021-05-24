import { css, useTheme } from '@emotion/react'

export default function LoadingBar() {

  const theme : any = useTheme()

  return(
    <div css={css`
      z-index: 3;
      width: 100vw;
      position: fixed;
      top: 0;
      height: 5px;
    `}>
      <div css={css`
        height: inherit;
        width: 0;
        background-color: ${theme.colors.link};
        animation: loading 1s;
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 50%;
          }
          100% {
            width: 100%;
          }
        }
      `}>
      </div>
    </div>
  )
} 