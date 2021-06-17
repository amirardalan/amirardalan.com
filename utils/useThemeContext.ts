import { useState, useEffect } from 'react'


// Theme context for theme-specific non-CSS
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

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
      setMode('dark') :
      localTheme ?
        setTheme(localTheme) :
        setMode('light')
  }, [])

  return [theme, toggleTheme]
}