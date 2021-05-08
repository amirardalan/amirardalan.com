import React from 'react'
import Image from 'next/image'
import { func, string } from 'prop-types';
import { useTheme, css } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {

  const theme = useTheme()

  return (
    <>
      <button
        tabIndex='2'
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        css={css`
          background: none;
          border: none;
          margin: 0;
          padding: 0;
          cursor: pointer;
          display: flex;
          overflow: hidden;
          align-self: center;
          &:hover {
            span { animation: slide-left .5s forwards; }
          }
        `}>

        <span css={css`
          color: ${theme.colors.text};
          width: 50px;
          font-size: 8px;
          line-height: .7rem;
          text-transform: uppercase;
          padding: .3rem .5rem 0 0;
          text-align: right;
          animation: slide-right .3s forwards; `}>
          {theme.toggleButton.text}
        </span>

        <Image
          src={theme.toggleButton.icon}
          alt={theme.toggleButton.iconAlt}
          aria-label={theme.toggleButton.iconAlt}
          width={30}
          height={30}
          css={css`
            background: ${theme.colors.background};
            transition: background-color .25s linear;
          `}
        />
      </button>
    </>
  )
}

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;