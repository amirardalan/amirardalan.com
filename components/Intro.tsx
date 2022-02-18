import { useTheme } from '@emotion/react'

export default function Intro() {
  const theme: any = useTheme()

  return theme.intro
}