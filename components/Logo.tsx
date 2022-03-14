import { css, useTheme } from '@emotion/react'
import Image from 'next/image'
import { logo } from '@/data/content'


export default function Logo() {
  
  const theme : any = useTheme()

  const styleLogo = css({
    display: 'block',
    animation: 'spin 1s forwards',
    fontSize: 0,
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    }
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
    <>
      <Image
        src={theme.logo}
        alt={logo.alt}
        width={25}
        height={25}
        css={styleLogo}
        draggable={false}
        priority
      />
      <div css={{flexDirection: 'column'}}>
        <title css={styleTitle}>
          {logo.title}
        </title>
        <div
          aria-label={logo.subtitle}
          css={styleTitleSub}>
          {logo.subtitle}
        </div>
      </div>
    </>
  )
}