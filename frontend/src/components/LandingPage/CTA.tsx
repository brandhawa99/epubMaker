import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa6";

export default function CTA() {
  return (
    <section className="py-36 px-4 border-t border-2-gray border-b">
      <div className="max-w-5xl mx-auto bg-orange-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-orange-200">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-700 rounded-full translate-x-1/2 translate-y-1/2 opacity-30 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to tell your story?
          </h2>
          <p className="text-orange-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the 45,000+ people who have already turned their memories into masterpieces. Start your journey today.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 rounded-full px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl group"
            >
              <Link to="/create" className="flex items-center gap-3">
                Start Creating Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="text-orange-200/80 font-medium tracking-wide text-sm">
              No credit card required · Free to start
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
