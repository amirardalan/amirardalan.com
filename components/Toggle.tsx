import { useState } from 'react'
import { useTheme } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {

  const theme : any = useTheme()
  
  const [toggleThemControl, setToggleThemeControl] = useState(false)
  const themeControlToggled = () => {
    setToggleThemeControl(!toggleThemControl),
    toggleTheme()
  }

  return (
    <>
      <button
        onClick={themeControlToggled}
        aria-label="Toggle Dark Mode"
        css={{
          zIndex: 6,
          width: 55,
          padding: '.1rem .1rem',
          background: theme.toggleButton.background,
          position: 'relative',
          border: '1px solid' + theme.colors.divider,
          borderRadius: 15,
          color: theme.colors.text,
          cursor: 'pointer',
          '&::after': {
            zIndex: -1,
            content: `'${theme.toggleButton.icon}'`,
            position: 'absolute',
            top: 14,
            lineHeight: 0,
            left: toggleThemControl ? 22 : 0,
            right: toggleThemControl ? 0 : 22,
            fontSize: '17px',
          }
      }}>
        <span>
          <div css={{
            background: '#e2e2e2',
            height: 25,
            width: 25,
            position: 'relative',
            marginLeft: toggleThemControl ? 0 : 25,
            marginRight: toggleThemControl ? 25 : 0,
            borderRadius: 15,
            boxShadow: '0 0 5px' + theme.colors.linkLight,
            transition: '.2s linear',
          }} />
        </span>
      </button>
    </>
  )
}

export default Toggle