import Meta from '../components/Meta'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'
import ThreeCanvas from '../components/ThreeCanvas'
import Typical from 'react-typical'

export default function Home() {
  return (
    <div className="container">

      <Meta />

      <main>

        <div className="mainLeft">
          
          <div className="logo">
          <Image
              src="/photo.png"
              alt="Picture Amir Ardalan"
              width={120}
              height={120}
              className="photo"
            />
            <Link href="/">
              <a><h1>Amir Ardalan Portfolio</h1></a>
            </Link>
          </div>

          <h2 className="title">
            Hi, 👋 I'm <Link href="/bio"><a>Amir Ardalan</a></Link>.
            <br/> My passions include:
            <Typical
              steps={[
                "React.js", 1500,
                "User Interface design", 1500,
                "Front-end development", 1500,
                "Web accessibility", 1500,
                "Learning 📚", 1500,
                "...and eating pizza 🍕", 1500,
              ]}
              loop={Infinity}
              className="title"
            />
            <br/> Check out my <Link href="/work"><a>work</a></Link>.
            <br/> Download my <Link href="/amir-ardalan-resume.pdf"><a>resume</a></Link>.
          </h2>

        </div>

        <div className="mainRight">
          <ThreeCanvas />
        </div>

      </main>

      <Footer />

    </div>
  )
}
