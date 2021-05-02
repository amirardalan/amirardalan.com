import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import Typical from 'react-typical'
import ThreeCanvas from '../components/ThreeCanvas'

export default function Home() {
  return (
    <div className="container">

      <main>

        <div className="mainLeft">
          
          <Header />

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
          <h4>Click + Drag / Scroll 🔍</h4>
          <ThreeCanvas />
        </div>

      </main>

      <Footer />

    </div>
  )
}
