import { css, useTheme } from '@emotion/react'

export default function LoadingTriangle() {

  const theme : any = useTheme()

  return(
    <div
      className="loader triangle"
      css={{
        '--path': theme.colors.divider,
        '--dot': theme.colors.link,
        '--duration': '1s',
        width: '48px',
        height: '44px',
        position: 'relative',
        '&:before': {
          content: "''",
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          position: 'absolute',
          display: 'block',
          background: 'var(--dot)',
          top: '37px',
          left: '21px',
          transform: 'translate(-10px, -18px)',
          animation: 'dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
          '@keyframes dotTriangle': {
            '33%': { transform: 'translate(0, 0)' },
            '66%': { transform: 'translate(10px, -18px)' },
            '100%': { transform: 'translate(-10px, -18px)' },
          }
        }
      }}
    >
      <svg
        viewBox="0 0 86 80"
        css={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        <polygon
          points="43 8 79 72 7 72"
          css={{
            fill: 'none',
            stroke: 'var(--path)',
            strokeWidth: '10px',
            strokeLinejoin: 'round',
            strokeLinecap: 'round',
            strokeDasharray: '145 76 145 76',
            strokeDashoffset: '0',
            animation: 'pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
            '@keyframes pathTriangle': {
              '33%': { strokeDashoffset: 74 },
              '66%': { strokeDashoffset: 147 },
              '100%': { strokeDashoffset: 221 },
            }
          }}
        >
        </polygon>
      </svg>
    </div>
  )
}