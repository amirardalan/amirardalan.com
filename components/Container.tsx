import LoadingBar from '@/components/LoadingBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout(props: any) {

  return (
    <>
      <LoadingBar />
      <Header />
      <div className="container">
        {props.children}
        <Footer />
      </div>
    </>
  )
}