/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Database, Server, Shield, Search, Sparkles } from "lucide-react"
import Image from "next/image"

const tools = [
  {
    name: "Next.js",
    icon: (props: any) => (
      <Image src="/placeholder.svg?height=40&width=40" alt="Next.js" width={40} height={40} {...props} />
    ),
    description: "React framework for building fast and scalable web applications",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    description: "Powerful, open source object-relational database system",
  },
  {
    name: "Inngest",
    icon: Server,
    description: "Serverless queues and background jobs made simple",
  },
  {
    name: "Arcjet",
    icon: Shield,
    description: "AI-powered security and performance optimization",
  },
  {
    name: "Pinecone",
    icon: Search,
    description: "Vector database for lightning-fast similarity search",
  },
  {
    name: "Google Gen AI",
    icon: Sparkles,
    description: "State-of-the-art embedding model for advanced NLP tasks",
  },
]

export function ToolsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Powered by Cutting-Edge Tech</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="mb-4 text-primary flex justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <tool.icon size={40} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-white text-center">{tool.name}</h3>
              <p className="text-gray-300 text-center">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

