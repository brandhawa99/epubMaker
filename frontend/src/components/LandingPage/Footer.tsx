import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className=" flex justify-center items-center gap-2 py-40 pb-10">
      <Button asChild variant="link">
        <Link to={"."}>Privacy Policy</Link>
      </Button>
      <span>·</span>
      <Button asChild variant="link">
        <Link to={"."}>Terms of Service</Link>
      </Button >
      <span>·</span>
      <Button asChild variant="link">
        <Link to={"."}>Contact</Link>
      </Button>
      <span>·</span>
      <Button asChild variant="link">
        <Link to={"."}>About</Link>
      </Button>
    </footer >
  )
}