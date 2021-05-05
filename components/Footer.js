import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div>
        Copyright &copy;
        {(new Date().getFullYear())}
        {' '}-{' '} Amir Ardalan
      </div>
      <div className="small">
        Made with <span>&hearts;</span> using: 
        <Link href="https://nextjs.org/"><a>Next.js</a></Link>+ 
        <Link href="https://emotion.sh/"><a>Emotion</a></Link>+ 
        <Link href="https://threejs.org/"><a>Three.js</a></Link>
      </div>
    </footer>
  )
}