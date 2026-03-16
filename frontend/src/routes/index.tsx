import { NavBar } from '@/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/LandingPage/Hero'
import Footer from '@/components/LandingPage/Footer'
import Features from '@/components/LandingPage/Features'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
