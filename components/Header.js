import { useTheme, css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'

export default function Header() {

  const theme = useTheme()

  // Logo Styles
  const Image = styled.img`
    cursor: pointer;
    animation: spin 1s forwards;
    &:hover {
      animation: spin-reverse 1s forwards;
    }
  `

  return (
    <div css={css`
      position: relative;
      align-self: center;
      display: flex;
      flex-direction: row;
      line-height: .8rem;
    `}>

      <Image
        src={theme.logo}
        alt="Amir Ardalan Logo"
        width={30}
        height={30}
      />

      <div css={css`
        flex-direction: column;
        margin-left: .2rem;
        animation: slide-left 1s forwards;
      `}>
        
        <h1 css={css`
            padding: .2rem 0 0 0;
            margin: 0;
            font-weight: 800;
            font-size: 14px;
            color: ${theme.colors.text};
          `}>
            Amir Ardalan
          </h1>

          <h2 css={css`
            margin: 0;
            padding: .2rem 0 0 0;
            color: ${theme.colors.textLight};
            font-size: 8px;
            font-weight: 500;
            letter-spacing: .01rem;
          `}>45.5051° N, 122.6750° W
          </h2>

      </div>

    </div>
  )
}