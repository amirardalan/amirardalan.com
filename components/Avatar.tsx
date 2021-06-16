import Image from 'next/image'


export default function Photo({height, width}) {

  const clip = width / 2

  return (
    <Image
      src="https://github.com/amirardalan.png"
      alt="Amir Ardalan"
      aria-label="Amir Ardalan"
      width={width}
      height={height}
      css={{ clipPath: `circle(${clip}px at center)`}}
    />
  )
}