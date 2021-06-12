import Image from 'next/image'


export default function Photo() {

  return (
    <Image
      src="https://github.com/amirardalan.png"
      alt="Amir Ardalan"
      aria-label="Amir Ardalan"
      width={100}
      height={100}
      css={{ clipPath: 'circle(50px at center)' }}
    />
  )
}