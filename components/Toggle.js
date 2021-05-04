import React from 'react'
import { func, string } from 'prop-types';
import { useTheme } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {
  const isLight = theme === 'light'
  const theme = useTheme()
  return (
    <button onClick={toggleTheme} className='toggleButton' >
      {theme.toggleButton.text}
    </button>
  )
}

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;