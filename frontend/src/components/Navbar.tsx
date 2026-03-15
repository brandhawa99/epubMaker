import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { FaBook } from "react-icons/fa"

export const NavBar = () => {
  return (
    <div className="flex gap-2 justify-around py-3 items-center border-b-2 border-gray-200  ">

      <div className="flex items-center gap-2">
        <FaBook color="#f54900" size={24} />
        <Link to="/" className="text-xl font-bold">Everbound</Link>
      </div>
      <div>
        {/* How it works features stories */}
        {/* features process showcase pricing */}
        <Button asChild variant={"link"} >
          <Link to="/" hash="How-it-works">
            How it works
          </Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to="/" hash="Features">
            Features
          </Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to="/" hash="Stories">
            Stories
          </Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to="/" hash="Pricing">
            Pricing
          </Link>
        </Button>
      </div>
      <Button asChild className="bg-[#EC5B13] text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 ease-out hover:bg-orange-500 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md active:bg-orange-600">
        <Link to="/create">Start Creating</Link>
      </Button>
    </div >
  )
}