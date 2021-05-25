import { css, useTheme } from '@emotion/react'

export default function LoadingBar() {

  const theme : any = useTheme()

  return(
    <div css={{
      zIndex: 10,
      width: '100vw',
      position: 'fixed',
      top: 0,
      height: '5px'
    }}>
      <div css={{
        height: 'inherit',
        width: 0,
        backgroundColor: theme.colors.link,
        animation: 'loading 1s',
        '@keyframes loading': {
          '0%': {
            width: '0%'
          },
          '50%': {
            width: '50%',
          },
          '100%': {
            width: '100%'
          }
        }
      }}>
      </div>
    </div>
  )
} 