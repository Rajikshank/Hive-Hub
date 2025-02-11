"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Briefcase, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "Our AI-powered algorithm matches you with the perfect job opportunities based on your skills and preferences.",
  },
  {
    icon: Briefcase,
    title: "Career Growth Tools",
    description:
      "Access a suite of tools designed to help you advance your career, including resume builders and interview prep resources.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Stay ahead with real-time industry trends, salary information, and job market analytics.",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover-glow cursor-pointer"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <motion.div
                className="mb-4 text-primary"
                animate={hoveredIndex === index ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                <feature.icon size={40} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

