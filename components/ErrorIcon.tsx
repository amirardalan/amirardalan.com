import Image from 'next/image'
import { errorContent } from '@/data/content'
import { useTheme } from '@emotion/react'

export default function ErrorIcon() {
  const theme: any = useTheme()

  return (
    <Image
      src={theme.icons.error}
      alt={errorContent.img.meta}
      aria-label={errorContent.img.meta}
      width={40}
      height={40}
    />
  )
}