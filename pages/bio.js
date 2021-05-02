import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'
import ThreeCanvas from '../components/ThreeCanvas'

export default function Bio() {
  return (
    <div className="container">

      <main>

        <div className="mainLeft">
          
          <div className="logo">
            <Link href="/">
              <a>
                <Image
                  src="/photo.png"
                  alt="Picture Amir Ardalan"
                  width={120}
                  height={120}
                  className="photo"
                />
                <h1>Amir Ardalan Portfolio</h1>
              </a>
            </Link>
          </div>

          <h2 className="title">
            Bio
            <br/>
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
