import { css, useTheme } from '@emotion/react'

export default function LoadingBar() {

  const theme : any = useTheme()

  return(
    <div css={css`
      width: 100vw;
      height: 5px;
      position: absolute;
      top: 0;
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