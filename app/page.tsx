import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import SocialStrip from '@/components/SocialStrip'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Education />
      <Contact />
      <SocialStrip />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
