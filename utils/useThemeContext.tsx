import { useState } from 'react'

export const useThemeContext= () => {
  const [theme, setTheme] = useState(null)
  const setMode = (mode : string) => {
    setTheme(mode)
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  return [theme, toggleTheme]
}