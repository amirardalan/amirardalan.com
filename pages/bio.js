import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import ThreeCanvas from '../components/ThreeCanvas'

export default function Bio() {
  return (
    <div className="container">

      <main>

        <div className="mainLeft">
          
          <Header />

          <h2 className="title">
            Bio
            <br/>
            <br/> Go <Link href="/"><a>home</a></Link>
            <br/> Check out my <Link href="/work"><a>work</a></Link>
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
