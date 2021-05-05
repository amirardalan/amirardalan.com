import Link from 'next/link'

export default function Header() {
  return (
    <Link href="/">
      <a className="title">
        <h1>Amir Ardalan Portfolio</h1>
      </a>
    </Link>
  )
}