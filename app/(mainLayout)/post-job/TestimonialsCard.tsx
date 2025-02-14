'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface Company {
  id: string;
  logo: StaticImageData;
  name: string;
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

interface Stat {
  value: string;
  label: string;
}

 

const ModernTestimonials   = ({ companies, testimonials, stats }:{companies:Company[],testimonials:Testimonial[],stats:Stat[]}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="col-span-1">
      <Card className="lg:sticky lg:top-4 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription className="text-lg">
              Join thousands of companies hiring top talent
            </CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Animated Company Logos */}
          <motion.div 
            className="grid grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                className="flex items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.05, rotate: 2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Testimonials Carousel */}
          <div className="relative h-48 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="absolute w-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : -100,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <p className="text-lg italic text-gray-600 dark:text-gray-300">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.author[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Stats */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernTestimonials;