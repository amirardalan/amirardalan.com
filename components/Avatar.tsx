import Image from 'next/image'
import { css } from '@emotion/react'
import { avatar } from '@/data/content'


export default function Photo({ height, width }) {

  const clip = width / 2

  const styleAvatarTint = css({
    position: 'absolute',
    zIndex: 2,
    width: `${width}px`,
    height: `${height}px`,
    background: 'var(--color-primary)',
    opacity: .1,
    borderRadius: `${clip}px`,
  })

  return (
    <>
      <div css={styleAvatarTint}/>
      <Image
        src={avatar.img}
        alt={avatar.title}
        aria-label={avatar.title}
        width={width}
        height={height}
        draggable={false}
        css={{clipPath:`circle(${clip}px at center)`,}}
        priority
      />
    </>
  )
}