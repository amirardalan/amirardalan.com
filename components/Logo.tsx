import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

export default function Logo() {

  const theme : any = useTheme()

  // Logo Animation
  const Image = styled.img`
    animation: spin 1s forwards;
  `

  return (
    <>
      <Image
        src={theme.logo}
        alt="Amir Ardalan Logo"
        width={30}
        height={30}
      />

      <div css={{
        flexDirection: 'column',
      }}>
        <h1 css={{
          margin: '0',
          fontWeight: 'bold',
          fontSize: '14px',
          color: theme.colors.text,
          lineHeight: '1.2rem'
        }}>
          Amir Ardalan
        </h1>

        <p
          aria-label="Portland, Oregon"
          css={{
            position: 'relative',
            margin: '0',
            color: theme.colors.footer,
            fontFamily: "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
            fontSize: '8px',
            fontWeight: 'normal',
            letterSpacing: '.11rem',
            textAlign: 'left',
            textTransform: 'uppercase'
          }}>
          Portland,Oregon
        </p>
      </div>
    </>
  )
}