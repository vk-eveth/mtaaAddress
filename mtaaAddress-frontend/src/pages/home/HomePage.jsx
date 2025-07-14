import Navbar from '../../components/home/Navbar'
import Hero from '../../components/home/Hero'
import HowItWorks from '../../components/home/HowItWorks'
import Features from '../../components/home/Features'
import Benefits from '../../components/home/Benefits'
import Testimonials from '../../components/home/Testimonials'
import Partners from '../../components/home/Partners'
import CallToAction from '../../components/home/CallToAction'
import Footer from '../../components/home/Footer'

export default function HomePage() {
  return (
      <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Benefits />
      <Testimonials />
      <Partners />
      <CallToAction />
      <Footer />
    </>
  )
}
