import { css, useTheme } from '@emotion/react'
import Image from 'next/image'


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
    margin: '0 0 0 .2rem',
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: '1rem'
  })
  const styleTitleSub = css({
    position: 'relative',
    margin: '0 0 0 .2rem',
    color: 'var(--color-gray)',
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
        alt="Amir Ardalan Logo"
        width={22}
        height={22}
        css={styleLogo}
        priority
      />
      <div css={{
        flexDirection: 'column',
      }}>
        <h1 css={styleTitle}>
          Amir Ardalan
        </h1>
        <div
          aria-label="Portland, Oregon"
          css={styleTitleSub}>
          Portland,Oregon
        </div>
      </div>
    </>
  )
}