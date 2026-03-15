import { NavBar } from '@/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/LandingPage/Hero'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <NavBar />
      <Hero />
    </div>
  )
}
