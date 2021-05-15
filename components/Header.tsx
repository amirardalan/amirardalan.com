import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

export default function Header() {

  const theme : any = useTheme()

  // Logo Animation
  const Image = styled.img`
    cursor: pointer;
    animation: spin 1s forwards;
    &:hover {
      animation: spin-reverse 1s forwards;
    }
  `

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column'
    }}>

      <Link
        href="/"
        aria-label="Amir Ardalan Logo">

        <button
          css={{
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            margin: '0',
            padding: '0',
            display: 'block'
          }}>

          <div css={{
            position: 'relative',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            lineHeight: '.8rem',
            cursor: 'pointer'
          }}>

            <Image
              src={theme.logo}
              alt="Amir Ardalan Logo"
              width={30}
              height={30}
            />

            <div css={{
              flexDirection: 'column',
              marginLeft: '.2rem',
              animation: 'slide-left 1s forwards',
              fontFamily: "'Poppins', Arial, Helvetica, sans-serif"
            }}>
              
              <h1 css={{
                padding: '.2rem 0 0 0',
                margin: '0',
                fontWeight: 'bold',
                fontSize: '14px',
                color: theme.colors.text
              }}>
                Amir Ardalan
              </h1>

              <p aria-hidden="true"
                css={{
                  margin: '0',
                  padding: '.2rem 0 0 0',
                  color: theme.colors.textLight,
                  fontSize: '8px',
                  fontWeight: 'normal',
                  letterSpacing: '.01rem'
                }}>
                45.5051° N, 122.6750° W
              </p>

            </div>
          </div>
        </button>
      </Link>
    </div>
  )
}