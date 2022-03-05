import { useLoadingBar } from '../utils/useLoadingBar'
import { css } from '@emotion/react'


export default function LoadingBar() {

  const isLoading = useLoadingBar()

  const styleLoadingBarWrapper = css({
    zIndex: 10,
    width: '100vw',
    position: 'fixed',
    top: 0,
    height: '5px'
  })
  const styleLoadingBarProgress = css({
    height: 'inherit',
    width: 0,
    backgroundColor: 'var(--color-accent-color)',
    animation: 'loading 3s',
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
  })

  const RenderLoadingBar = () => (
    <div css={styleLoadingBarWrapper}>
      <div css={styleLoadingBarProgress} />
    </div>
  )

  return (
    <>
      { isLoading ? <RenderLoadingBar /> : null }
    </>
  )
} 