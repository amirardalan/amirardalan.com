import React from 'react'
import Image from 'next/image'
import { func, string } from 'prop-types';
import { useTheme } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {
  const isLight = theme === 'light'
  const theme = useTheme()
  return (
    <>
      <div className="toggleButton" onClick={toggleTheme}>
        <span>{theme.toggleButton.text}</span>
        <Image
          src={theme.toggleButton.icon}
          alt={theme.toggleButton.iconAlt}
          width={30}
          height={30}
        />
      </div>
    </>
  )
}

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;