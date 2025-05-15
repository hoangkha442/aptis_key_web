import { useEffect } from "react"
import Banner from "./Banner"
import CertiAndDoc from "./CertiAndDoc"
import FAQ from "./FAQ"
// import StudySupport from "./StudySupport"
// import Testimonials from "./Testimonials"
import { Helmet } from "react-helmet-async";
import NavBar from "./_component/NavBar"
import BackToTop from "./_component/BackToTop"
import Footer from "./_component/Footer"
import Tutor from "./Tutor";
type Props = {}

export default function Introduction({}: Props) {
  useEffect(() => {
    document.title = "Giới thiệu | PassKey Center";
  }, []);
  return (
    <>
      <Helmet>
          <title>Giới thiệu | PassKey Center</title>
      </Helmet>
      <NavBar />
      <BackToTop scrollThreshold={200} />
      <Banner />
      <CertiAndDoc />
      {/* <StudySupport /> */}
      {/* <Testimonials /> */}
      <Tutor />

      <FAQ />
      <Footer />
    </>
  )
}