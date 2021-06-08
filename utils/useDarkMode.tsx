import { useEffect, useState } from 'react'

const useDarkMode = () => {

  const [theme, setTheme] = useState(document.body.dataset.theme)
  const setMode = (mode : string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
      document.body.dataset.theme = 'dark'
    } else {
      setMode('light')
      document.body.dataset.theme = 'light'
    }
  }

  useEffect(() => {
    const localTheme: any = window.localStorage.getItem('theme')
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
    ? setMode('dark')
    : localTheme
    ? setTheme(localTheme)
    : setMode('light')
  }, [])

  return [theme, toggleTheme]
}

export default useDarkMode