import React from "react"
import ReactDom from "react-dom/client"
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryCLient = new QueryClient()
const router = createRouter({
  routeTree,
  context: {
    queryCLient
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,

})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
  const root = ReactDom.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryCLient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}