import Head from 'next/head'
import Image from 'next/image'
import { container, main, mainLeft, mainRight, title, icon, footer } from '../components/Home/styles'

export default function Home() {
  return (
    <div className={container}>

      <Head>
        <title>Amir Ardalan &mdash; Portfolio</title>
        <meta name="description"
          content="Portfolio of Amir Ardalan. Front-End Engineer and UI Designer with 6+
          years professional experience crafting online experiences for top brands." />
        <link rel="icon" href="/favicon.ico" />
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
            Hi, I'm <a href="/">Amir Ardalan</a> 👋,
            <br/> designer & developer
            <br/> from Portland, OR.
            <br/> Check out my <a href="/">work</a>,
            <br/> or download my <a href="/">resume</a>.
          </h1>
        </div>

        <div className={mainRight}>
          
        </div>

      </main>

      <footer className={footer}>
        <div>
          Copyright &copy;
          {(new Date().getFullYear())}
          {' '}&mdash;{' '} Amir Ardalan. All Rights Reserved
        </div>
        <div className="small">
          Made with ❤️ using <a href="https://nextjs.org/">Next.js</a> + <a href="https://emotion.sh/">Emotion</a>
        </div>
      </footer>
    </div>
  )
}
