import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"

export const NavBar = () => {
  return (
    <div className="flex gap-2 py-2 items-center ">
      {/* <OtterMascot /> */}
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
      <Button asChild>
        <Link to="/create">Go Create</Link>
      </Button>
    </div>
  )
}