import { css, useTheme } from '@emotion/react'

export default function LoadingBar() {

  const theme = useTheme()

  return(
    <div css={css`
      height: 5px;
      width: inherit;
      margin-top: .5rem;
    `}>
      <div css={css`
        height: inherit;
        width: 0;
        background-color: ${theme.colors.link};
        animation: loading 1s;

        @keyframes loading {
          0% {
            width: 1%;
            opacity: 1;
          }
          50% {
            width: 50%;
            opacity: 1;
          }
          96% {
            width: 100%;
            opacity: .7;
          }
          100% {
            width: 100%;
            opacity: 0;
          }
        }
      `}>
      </div>
    </div>
  )
} 