"use client" 

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
// No specific Phosphor Icons are needed for this static content example,
// but they would be imported here if used in buttons or other elements.

export default function WhatwedoSectionn() {
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariants}
            className="md:pr-12"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-0.5 bg-gray-300"></div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                What we do
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              We are working cross country
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
          </motion.div>

          {/* Right Image Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={imageVariants}
            className="flex justify-center md:justify-end"
          >
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/blocks/hero-image.png"
                alt="Happy children reaching out"
                width={500} // Adjust based on your design needs
                height={500} // Adjust based on your design needs
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}