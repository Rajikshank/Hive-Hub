"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">
          Hive<span className="text-primary">Hub</span>
        </Link>
        <nav className="space-x-6">
          <Link href="#features" className="text-white hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#testimonials" className="text-white hover:text-primary transition-colors">
            Testimonials
          </Link>
          <Link href="#tools" className="text-white hover:text-primary transition-colors">
            Our Tech
          </Link>
          <Button
            variant="secondary"
            
          >
            Log In
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">Sign Up</Button>
        </nav>
      </div>
    </header>
  )
}

