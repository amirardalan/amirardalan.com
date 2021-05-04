import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentHome from '../components/ContentHome'
import ThreeCanvas from '../components/ThreeCanvas'

export default function Home() {
  
  return (
    <div className="container">
      <main>
        <div className="mainLeft"> 
          <Header />
          <h2 className="content">
            <ContentHome />
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
