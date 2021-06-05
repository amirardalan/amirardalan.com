import { useState, useEffect } from 'react'
import Router from 'next/router'

export const useLoadingBar = () => {

  // Show loading indicator on router events
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => { setLoading(true) }
    const end = () => { setLoading(false) }
    Router.events.on('routeChangeStart', () => {
      start
      document.documentElement.classList.add('normal-scroll')
    })
    Router.events.on('routeChangeComplete', () => {
      end
      document.documentElement.classList.remove('normal-scroll')
    })
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return loading
}