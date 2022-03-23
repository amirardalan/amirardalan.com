import { useState, useEffect } from "react"
import { css } from '@emotion/react'


const ThemeToggle = ({ toggleTheme }) => {

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"
  const [toggleThemeControl, setToggleThemeControl] = useState(false)

  const themeToggled = () => {
    setActiveTheme(inactiveTheme)
    setToggleThemeControl(!toggleThemeControl)
    toggleTheme()
  }
  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem('theme', activeTheme)
  }, [activeTheme])

  const styleToggleSwitchControl = css({
    zIndex: 6,
    width: 45,
    height: 25,
    padding: '0 .1rem 0 .1rem',
    background: 'var(--color-text)',
    position: 'relative',
    border: 'none',
    borderRadius: 25,
    cursor: 'pointer',
  })
  const styleToggleSwitch = css({
    background: 'var(--color-accent)',
    height: 23,
    width: 23,
    position: 'relative',
    marginLeft: activeTheme === 'dark' ? 0 : 19,
    marginRight: activeTheme === 'light' ? 24 : .4,
    borderRadius: 25,
    transition: '.2s linear',
    '&:active': {
      boxShadow: '0 0 8px var(--color-primary)',
    }
  })

  return (
    <button
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={themeToggled}
      css={styleToggleSwitchControl}
    >
      <div>
        <div css={styleToggleSwitch} />
      </div>
    </button>
  )
}

export default ThemeToggle