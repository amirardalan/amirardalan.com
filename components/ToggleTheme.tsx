import { useState } from 'react'
import { css } from '@emotion/react'

const ToggleTheme: any = ({ toggleTheme }) => {

  const [toggleThemeControl, setToggleThemeControl] = useState(false)
  const themeControlToggled = () => {
    setToggleThemeControl(!toggleThemeControl),
    toggleTheme()
  }
  
  const styleToggleSwitchControl = css({
    zIndex: 6,
    width: 50,
    height: 25,
    padding: '0 .1rem 0 .1rem',
    background: 'var(--button-toggle-bg)',
    position: 'relative',
    border: 'none',
    borderRadius: 25,
    color: 'var(--color-text)',
    cursor: 'pointer',
  })
  const styleToggleSwitch = css({
    background: 'var(--button-toggle-switch)',
    height: 23,
    width: 23,
    position: 'relative',
    marginLeft: toggleThemeControl ? .4 : 24,
    marginRight: toggleThemeControl ? 24 : .4,
    borderRadius: 25,
    transition: '.2s linear',
    '&:active': {
      boxShadow: '0 0 8px var(--color-accent-color)',
    }
  })

  return (
    <button
      onClick={themeControlToggled}
      aria-label="Toggle Dark/Light Theme"
      css={styleToggleSwitchControl}>
      <div>
        <div css={styleToggleSwitch} />
      </div>
    </button>
  )
}

export default ToggleTheme