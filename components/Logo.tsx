import React from 'react'
import { css } from '@emotion/react'
import { logo } from '@/data/content'
import { useLoadingBar } from '@/utils/useLoadingBar'


const Logo = () => {
  
  const isLoading = useLoadingBar()

  const styleAnimationWrapper = css({
    maxHeight: 24,
    overflow: 'hidden',
  })
  const styleLogoWrapper = css({
    display: 'flex',
    flexDirection: 'row'
  })
  const styleLogo = css({
    margin: '.1rem .4rem 0 0',
    background: 'var(--logo) no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
  })
  const styleWordMark = css({
    textAlign: 'left',
  })
  const styleTitle = css({
    display: 'block',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: .6,
    color: 'var(--color-heading)',
    lineHeight: '.95rem',
    textTransform: 'uppercase',
    animation: 'slideDown .5s ease',
  })
  const styleTitleSub = css({
    position: 'relative',
    color: 'var(--color-gray)',
    fontFamily: 'var(--font-primary)',
    fontSize: 8,
    fontWeight: 'normal',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    animation: 'slideUp .5s ease',
  })
  const styleLoaderWrapper = css({
    display: 'flex',
    flexDirection: 'row',
    '.loader': {
      display: 'flex',
      alignItems: 'center',
      '.loadingDot': {
        float: 'left',
        width: '8px',
        height: '8px',
        margin: '0 4px',
        background: 'var(--color-heading)',
        borderRadius: '50%',
        opacity: '0',
        boxShadow: '0 0 2px black',
        animation: 'loadingFade 1s infinite',
      },
      '.loadingDot:nth-of-type(1)': {
        WebkitAnimationDelay: '0s',
        MozAnimationDelay: '0s',
        animationDelay: '0s',
      },
      '.loadingDot:nth-of-type(2)': {
          WebkitAnimationDelay: '0.1s',
          MozAnimationDelay: '0.1s',
          animationDelay: '0.1s',
      },
      '.loadingDot:nth-of-type(3)': {
          WebkitAnimationDelay: '0.2s',
          MozAnimationDelay: '0.2s',
          animationDelay: '0.2s',
      },
      '.loadingDot:nth-of-type(4)': {
          WebkitAnimationDelay: '0.3s',
          MozAnimationDelay: '0.3s',
          animationDelay: '0.3s',
      },
      '@-webkit-keyframes loadingFade': {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0 },
      },
      '@-moz-keyframes loadingFade': {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0 },
      },
      '@keyframes loadingFade': {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0 },
      }
    }
  })

  const RenderLogo = () => {
    if (!isLoading) {
      return (
        <div css={styleLogoWrapper}>
          <div css={styleLogo}/>
          <div css={styleWordMark}>
            <div css={styleTitle}>
              {logo.title}
            </div>
            <div
              aria-label={logo.subtitle}
              css={styleTitleSub}>
              {logo.subtitle}
            </div>
          </div>
        </div>
      )
    } else return null
  }

  const RenderLoading = () => {
    if (isLoading) {
      return (
        <div css={styleLoaderWrapper}>
          <div css={styleLogo}/>
          <div className="loader">
            <div className="loadingDot"/>
            <div className="loadingDot"/>
            <div className="loadingDot"/>
            <div className="loadingDot"/>
          </div>
        </div>
      )
    } else return null
  }

  return (
    <div className="animationWrapper" css={styleAnimationWrapper}>
      <RenderLogo/>
      <RenderLoading/>
    </div>
  )
}

export default React.memo(Logo)