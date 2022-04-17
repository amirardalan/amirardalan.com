import Image from 'next/image'
import { css } from '@emotion/react'


export default function Photo({avatar, height, width }) {

  const clip = width / 2

  const styleAvatarTint = css({
    zIndex: 2,
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    background: 'var(--color-avatar)',
    borderRadius: `${clip}px`,
    opacity: .15,
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