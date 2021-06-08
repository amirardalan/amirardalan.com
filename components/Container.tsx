import LoadingBar from '@/components/LoadingBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout(props: any) {

  return (
    <>
      <LoadingBar />
      <div className="container">
        <Header />
          {props.children}
        <Footer />
      </div>
    </>
  )
}