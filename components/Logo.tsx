import { css } from '@emotion/react'
import styled from '@emotion/styled'

export default function Logo() {

  const Image = styled.img({
    animation: 'spin 1s forwards',
    marginRight: '.2rem',
    fontSize: 0,
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    }
  })

  const styleTitle = css({
    margin: '0',
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: '1rem'
  })
  const styleTitleSub = css({
    position: 'relative',
    margin: '0',
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
        src="/logo/logo-light.svg"
        alt="Amir Ardalan Logo"
        width={22}
        height={22}
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