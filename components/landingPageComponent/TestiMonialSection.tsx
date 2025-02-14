"use client"
import Image, { StaticImageData } from "next/image"
import user1 from "@/public/user1.png"
import user2 from "@/public/user2.png"
import user3 from "@/public/user3.png"


interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  avatar: StaticImageData
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "HR Manager",
    company: "TechCorp",
    quote: "JobBoard has revolutionized our hiring process. We've found top talent faster than ever before!",
    avatar: user1,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    company: "StartupX",
    quote: "I landed my dream job through JobBoard. The platform is intuitive and the job matches are spot-on.",
    avatar: user2,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthCo",
    quote: "As a hiring manager, JobBoard has made it incredibly easy to find qualified candidates quickly.",
    avatar: user3,
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 glow-edge hover-glow">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-300">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-200 italic">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

