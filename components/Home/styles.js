import { css } from '@emotion/css'

export const container = css`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const main = css`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const title = css`
  margin: 0;
  line-height: 1.15;
  font-size: calc(3vw + 3vh);
  text-align: center;
  a {
    color: #0070f3;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }

  }
`

export const description = css`
  text-align: center;
`

export const code = css`
  background: #fafafa;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
`

export const grid = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`
export const card = css`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;

  @media (max-width: 655px) {
    width: 85%;
  }

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;

    @media (max-width: 655px) {
      margin: 0;
    }
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;

    @media (max-width: 655px) {
      display: none;
    }
  }
`
export const logo = css`
  height: 1em;
  margin-left: 0.5rem;
`
export const footer = css`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    color: #0070f3;
    padding: 0 .3em;
  }
  div {
    flex-direction: row;
  }
  .small {
    font-size: .75rem;
  }
`