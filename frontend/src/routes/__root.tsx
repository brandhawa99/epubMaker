import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NavBar } from '@/components/Navbar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
