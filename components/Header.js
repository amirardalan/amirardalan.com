import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="header">
      <Link href="/">
        <a>
          <Image
            src="/photo.png"
            alt="Picture Amir Ardalan"
            width={120}
            height={120}
            className="photo"
          />
        </a>
      </Link>
      <h1>
        <Link href="/">
          <a>Amir Ardalan Portfolio</a>
        </Link>
      </h1>
    </div>
  )
}