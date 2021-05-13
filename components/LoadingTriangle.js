import { css, useTheme } from '@emotion/react'

export default function LoadingTriangle() {

  const theme = useTheme()

  return(
    <div
      className="loader triangle"
      css={css`
        --path: ${theme.colors.divider};
        --dot: ${theme.colors.link};
        --duration: 1s;
        width: 48px;
        height: 44px;
        position: relative;
        &:before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          display: block;
          background: var(--dot);
          top: 37px;
          left: 21px;
          transform: translate(-10px, -18px);
          animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
      `}
    >
      <svg
        viewBox="0 0 86 80"
        css={css`
          display: block;
          width: 100%;
          height: 100%;
        `}
      >
        <polygon
          points="43 8 79 72 7 72"
          css={css`
            fill: none;
            stroke: var(--path);
            stroke-width: 10px;
            stroke-linejoin: round;
            stroke-linecap: round;
            stroke-dasharray: 145 76 145 76;
            stroke-dashoffset: 0;
            animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
          `}
        >
        </polygon>
      </svg>
    </div>
  )
}