import { useState } from 'react'
import { useTheme } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {
  
  const theme : any = useTheme()
  
  const [toggleThemeControl, setToggleThemeControl] = useState(false)
  const themeControlToggled = () => {
    setToggleThemeControl(!toggleThemeControl),
    toggleTheme()
  }

  return (
    <button
      onClick={themeControlToggled}
      aria-label="Toggle Dark Mode"
      css={{
        zIndex: 6,
        width: 50,
        height: 25,
        padding: '0 .1rem 0 .1rem',
        background: theme.toggleButton.background,
        position: 'relative',
        border: 'none',
        borderRadius: 25,
        color: theme.colors.text,
        cursor: 'pointer',
    }}>
      <div>
        <div css={{
          background: theme.toggleButton.switch,
          height: 23,
          width: 23,
          position: 'relative',
          marginLeft: toggleThemeControl ? .4 : 24,
          marginRight: toggleThemeControl ? 24 : .4,
          borderRadius: 25,
          boxShadow: '0 0 4px' + theme.colors.accentColor,
          transition: '.2s linear',
        }} />
      </div>
    </button>
  )
}

export default Toggle