import { useTheme, css } from '@emotion/react'

export default function Header() {
  const theme = useTheme()
  return (
    <div css={css`
      position: relative;
      align-self: center;
      display: flex;
      flex-direction: column;
      line-height: .8rem;
    `}>

      <h1 css={css`
        padding: .3rem 0 0 0;
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
      `}>45.5051° N, 122.6750° W</h2>
    </div>
  )
}