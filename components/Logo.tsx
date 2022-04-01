import { css } from '@emotion/react'
import { logo } from '@/data/content'


export default function Logo() {

  const styleLogoWrapper = css({
    display: 'flex',
    flexDirection: 'row'
  })

  const styleLogo = css({
    marginTop: 2,
    background: 'var(--logo) no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
  })

  const styleWordMark = css({
    marginLeft: '.4rem',
    textAlign: 'left',
  })

  const styleTitle = css({
    display: 'block',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: .5,
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: '1rem'
  })
  
  const styleTitleSub = css({
    position: 'relative',
    color: 'var(--color-neutral)',
    fontFamily: 'var(--font-primary)',
    fontSize: '8px',
    fontWeight: 'normal',
    letterSpacing: '.11rem',
    textTransform: 'uppercase'
  })


  return (
    <div css={styleLogoWrapper}>
      <div css={styleLogo}></div>
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
}