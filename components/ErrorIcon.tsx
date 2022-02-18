import Image from 'next/image'
import { error } from '@/data/content'
import { useTheme } from '@emotion/react'

export default function ErrorIcon() {
  const theme: any = useTheme()

  return (
    <Image
      src={theme.icons.error}
      alt={error.img.meta}
      aria-label={error.img.meta}
      width={40}
      height={40}
    />
  )
}