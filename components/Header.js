import Image from 'next/image'

export default function Header() {
  return (
    <div className="header">
      <Image
        src="/photo.png"
        alt="Picture Amir Ardalan"
        width={120}
        height={120}
      />
      <h1>Amir Ardalan Portfolio</h1>
    </div>
  )
}