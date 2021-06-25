import Image from 'next/image'
import { avatar } from '@/data/content'


export default function Photo({ height, width }) {

  const clip = width / 2

  return (
    <Image
      src={avatar.img}
      alt={avatar.title}
      aria-label={avatar.title}
      width={width}
      height={height}
      css={{clipPath:`circle(${clip}px at center)`}}
      draggable={false}
      priority
    />
  )
}