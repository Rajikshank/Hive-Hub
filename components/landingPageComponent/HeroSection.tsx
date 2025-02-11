"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-40 pb-20 text-center">
      <h1 className="text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
        Discover Your <span className="text-primary bg-white px-2 rounded">Dream Career</span>
      </h1>
      <p className="text-xl mb-10 text-white max-w-2xl mx-auto drop-shadow-md">
        Connect with top employers and unlock exciting opportunities tailored just for you. Your next big career move is
        just a click away.
      </p>
      <div className="space-x-4">

        <Link href={"/index"}>
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary/90 transition-colors text-lg px-8 py-3 rounded-full shadow-lg"
        >
          Get Started
        </Button>
        </Link>
        <Button
          size="lg"
          variant="default"
          className="text-white bg-gray-900 border-white hover:bg-white hover:text-primary transition-colors text-lg px-8 py-3 rounded-full shadow-lg"
        >
          Learn More
        </Button>
      </div>
    </section>
  )
}

