import Head from 'next/head'
import Image from 'next/image'
import { container, main, mainLeft, mainRight, title, icon, footer } from './Home/styles'
import ThreeCanvas from '../components/ThreeCanvas'


export default function Home() {
  return (
    <div className={container}>

      <Head>
        <title>Amir Ardalan &mdash; Portfolio</title>
        <meta name="description"
          content="Portfolio of Amir Ardalan. Front-End Engineer and UI Designer with 6+
          years professional experience crafting online experiences for top brands." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={main}>

        <div className={mainLeft}>
          <div className={icon}>
              <Image
                src="/icon.svg"
                alt=""
                width={200}
                height={200}
              />
          </div>

          <h1 className={title}>
            Hi, 👋 I'm <a href="/">Amir Ardalan</a>,
            <br/> a designer & developer
            <br/> from Portland, OR.
            <br/>
            <br/> Check out my <a href="/">work</a>.
            <br/> Download my <a href="/">resume</a>.
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
