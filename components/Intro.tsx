import { useTheme, css } from '@emotion/react'

const styleIntro = css({
  marginBottom: '.5rem',
  display: 'inline-block',
  fontFamily: 'var(--font-primary)',
  fontWeight: 'normal',
  fontSize: 17,
  color: 'var(--color-accent-color)'
})

export default function Intro() {
  const theme: any = useTheme()

  return <span css={styleIntro}>{theme.intro}</span>
}