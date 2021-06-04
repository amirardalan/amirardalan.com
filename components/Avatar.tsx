import Image from 'next/image'

export default function Photo() {

  return (
    <Image
      src="/static/avatar/avatar.png"
      alt="Amir Ardalan"
      aria-label="Amir Ardalan"
      width={100}
      height={100}
    />
  )
}