import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { FaPlayCircle } from "react-icons/fa";


export default function Hero() {

  return (
    <div>
      <h1 className="flex flex-col pt-20 text-5xl font-bold text-center bg-clip-text text-transparent bg-linear-to-br from-black to-zinc-500">
        <span>
          Stories Worth Keeping
        </span>
        <span>
          Your Memories, Beautifully Bound.
        </span>
      </h1>
      <p className="mx-auto mt-7 max-w-lg text-balance text-[clamp(1rem,1.9vw,1.18rem)] leading-[1.65] text-gray-700 text-center py-8 text-lg">Create professional eBooks with a minimalists interface designed for writers and non-writers alike</p>
      <div className="flex justify-center gap-4">
        <Button asChild className="rounded-full bg-orange-600 px-6 hover:bg-orange-700 ">
          <Link to="/create">
            Get Started
          </Link>
        </Button>
        <Button variant="ghost" className="px-6 text-orange-600 flex items-center rounded-full justify-around gap-0 hover:text-orange-600 hover:bg-orange-100">
          Watch the demo
          <FaPlayCircle className="ml-2" color="#ea580c" size={48} />
        </Button>
      </div>

      <div className="rounded-lg flex justify-center py-20 px-4">
        <div className="relative border-8 border-black w-full max-w-4xl aspect-video bg-zinc-900 rounded-3xl flex justify-center items-center overflow-visible shadow-2xl">
          <span className="text-zinc-700 font-mono italic">Product Preview / Editor</span>

          {/* Angled Hanging Div */}
          <div className="absolute -bottom-12 -right-12 w-64 h-40 bg-white border-4 border-black rounded-2xl shadow-2xl rotate-6 p-4 justify-between hidden md:flex md:flex-col">
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-zinc-200 rounded" />
              <div className="h-2 w-1/2 bg-zinc-100 rounded" />
            </div>
            <div className="flex justify-end">
              <div className="h-8 w-8 rounded-full bg-orange-500 border-2 border-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}