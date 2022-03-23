import Image from 'next/image'
import { useTheme } from '@emotion/react'

const CloseIcon: Function = ({width, height}) => {
  const theme: any = useTheme()

  return (
    <Image
      src={theme.icons.close}
      width={width}
      height={height}
      priority
      alt="Close menu"
      aria-label="close menu"
      draggable={false}
    />
  )
}

export default CloseIcon