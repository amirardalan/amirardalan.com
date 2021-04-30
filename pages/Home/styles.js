import { css } from '@emotion/css'

export const container = css`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const main = css`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  justify-content: space-between;

  @media (max-width: 890px) {
    padding: 3rem 0;
  }
`

export const mainLeft = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-self: flex-end;
  justify-content: space-between;

  @media (max-width: 890px) {
    width: 100%;
    justify-content: start;
    align-self: flex-start;
    margin-right: 0;
    flex-direction: row;
    height: auto;
  }
`

export const mainRight = css`
  background-color: #eaeaea;
  display: flex;
  height: 100%;
  width: 50%;
  flex-direction: column;
  align-self: flex-end;

  @media (max-width: 890px) {
    align-self: flex-start;
    width: 100%;
    height: 50vh;
  }
`

export const animation = css`
    canvas {
      aspect-ratio: auto 490 / 490;
    }
`

export const icon = css`
  @media (max-width: 890px) {
    order: 2;
    justify-content: right;
  }
  @media (max-width: 480px) {
    width: 3rem;
  }
`

export const title = css`
  margin: 0;
  line-height: 1.15;
  font-size: calc(2vw + 2vh);

  @media (max-width: 890px) {
    flex: 100%;
    margin-bottom: 1rem;
  }

  span {
    color: DarkSalmon;
  }
  a {
    color: DarkSalmon;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`

export const graphic = css`
  width: auto;
  align-self: flex-end;
  box-shadow: -15px 15px 0px 3px darksalmon;
  border-left: 4px solid white;
  flex: 50%;

  @media (max-width: 890px) {
    flex: 100%;
    align-self: flex-start;
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
  max-width: 890px;
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
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;

  @media (max-width: 655px) {
    width: 85%;
  }

  &:hover,
  &:focus,
  &:active {
    border-color: DarkSalmon;
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

export const footer = css`
  color: #ccc;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: .8rem;
  font-weight: 600;
  padding: 1em;
  a {
    color: DarkSalmon;
    padding: 0 .3em;
  }
  div {
    flex-direction: row;
  }
  .small {
    font-size: .75rem;
    span {
      color: darksalmon;
    }
  }
`