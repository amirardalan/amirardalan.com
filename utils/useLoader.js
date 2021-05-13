import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

export const useLoader = () => {
    
    const router = useRouter()
    const [loader, setLoader] = useState()
    useEffect(() => {
      let handleRouteStart = () => setLoader(true)
      const handleRouteChange = (url) => {
        gtag.pageview(url)
        setLoader(false)
      }
      router.events.on('routeChangeStart', handleRouteStart)
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events, setLoader])

  return setLoader
}