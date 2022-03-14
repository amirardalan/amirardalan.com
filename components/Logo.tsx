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
  const styleTitle = css({
    display: 'block',
    margin: '0 0 0 .2rem',
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: '1rem'
  })
  const styleTitleSub = css({
    position: 'relative',
    margin: '0 0 0 .2rem',
    color: 'var(--color-neutral)',
    fontFamily: 'var(--font-primary)',
    fontSize: '8px',
    fontWeight: 'normal',
    letterSpacing: '.11rem',
    paddingLeft: '.09rem',
    textAlign: 'left',
    textTransform: 'uppercase'
  })


  return (
    <div css={styleLogoWrapper}>
      <div css={styleLogo}></div>
      <div>
        <title css={styleTitle}>
          {logo.title}
        </title>
        <div
          aria-label={logo.subtitle}
          css={styleTitleSub}>
          {logo.subtitle}
        </div>
      </div>
    </div>
  )
}