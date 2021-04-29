import Head from 'next/head'
// import Image from 'next/image'
import { container, main, title, description, code, grid, card, footer, logo } from '../components/Home/styles'

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

        <h1 className={title}>
          Hi, I'm <a href="https://twitter.com/amirardalan">@amirardalan</a>!
        </h1>

        <p className={description}>
          <code className={code}>Fullstack Engineer</code>
        </p>

        <div className={grid}>
          <a href="/" className={card}>
            <h2>Work &rarr;</h2>
            <p>Selected code and design works.</p>
          </a>

          <a href="/" className={card}>
            <h2>Bio &rarr;</h2>
            <p>The person behind the code!</p>
          </a>

          <a href="/" className={card}>
            <h2>Resume &rarr;</h2>
            <p>I'm currently available for hire.</p>
          </a>

          <a href="/" className={card}>
            <h2>Contact &rarr;</h2>
            <p>Get in touch with me!</p>
          </a>
        </div>
      </main>

      <footer className={footer}>
        <div>
          Copyright &copy;
          {(new Date().getFullYear())}
          {' '}&mdash;{' '} All Rights Reserved
        </div>
        <div className="small">
          Made with ❤️ using <a href="https://nextjs.org/">Next.js</a> + <a href="https://emotion.sh/">Emotion</a>
        </div>
      </footer>
    </div>
  )
}
