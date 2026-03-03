import { NavBar } from '@/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><NavBar />Hello "/"!</div>
}
