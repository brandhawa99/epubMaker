import React from "react"
import ReactDom from "react-dom/client"
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js"
import { PostHogProvider } from "@posthog/react";


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

// const posthogOptions = {
//   api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
//   defaults: "2026-01-30"
// } as const

const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
  const root = ReactDom.createRoot(rootElement)
  root.render(
    // <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
    <QueryClientProvider client={queryCLient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    // </PostHogProvider>
  )
}