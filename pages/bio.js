import Meta from '../components/Meta'
import Link from 'next/link'
import Image from 'next/image'
import { container, main, mainLeft, mainRight, title, logo, footer } from './styles/home'
import ThreeCanvas from '../components/ThreeCanvas'


export default function Bio() {
  return (
    <div className={container}>

      <Meta />

      <main className={main}>

        <div className={mainLeft}>
          <div className={logo}>
            <Link href="/">
                <Image
                  src="/icon.svg"
                  alt=""
                  width={200}
                  height={200}
                />
            </Link>
          </div>

          <h1 className={title}>
            Bio
          </h1>
        </div>

        <div className={mainRight}>
          <ThreeCanvas />
        </div>

      </main>

      <footer className={footer}>
        <div>
          Copyright &copy;
          {(new Date().getFullYear())}
          {' '}-{' '} Amir Ardalan
        </div>
        <div className="small">
          Made with <span>&hearts;</span> using <a href="https://nextjs.org/">Next.js</a> + <a href="https://emotion.sh/">Emotion</a> + <a href="https://threejs.org/">Three.js</a>
        </div>
      </footer>
    </div>
  )
}
