"use client"

import { useGradientAnimation } from "@/lib/useGradientAnimation"  
import { Header } from "@/components/landingPageComponent/Header"  
import { HeroSection } from "@/components/landingPageComponent/HeroSection"  
import { FeaturesSection } from "@/components/landingPageComponent/FeaturesSection"  
import { TestimonialSection } from "@/components/landingPageComponent/TestiMonialSection" 
import { ToolsSection } from "@/components/landingPageComponent/ToolSection"  
import { Footer } from "@/components/landingPageComponent/Footer"  
 


 
 

export default function LandingPage() {
  const gradientStyle = useGradientAnimation()

  
 
 
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow animated-gradient" style={gradientStyle}>
        <Header />
        <main className="container mx-auto px-4">
          <HeroSection />
          <FeaturesSection />
          <TestimonialSection />
          <ToolsSection />
        </main>
      </div>
      <Footer />
    </div>
  )
}

