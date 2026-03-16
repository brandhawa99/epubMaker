import { NavBar } from '@/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/LandingPage/Hero'
import Footer from '@/components/LandingPage/Footer'
import Features from '@/components/LandingPage/Features'
import Process from '@/components/LandingPage/Process'
import CTA from '@/components/LandingPage/CTA'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  )
}
