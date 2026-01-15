"use client"

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// --- Framer Motion Variants ---
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const imageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4, // Delay main container animation slightly after header
      staggerChildren: 0.2, // Stagger animation for the individual images
    },
  },
};

const imageItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// --- Main Ongoing Projects Section Component ---
export default function OngoingProjectsSection() {
  const projectImages = [
    '/blocks/hero-image.png',
    '/blocks/hero-image.png',
    '/blocks/hero-image.png',
  ];

  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Header and Subtitle */}
        <motion.p
          className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          ON-GOING PROJECTS
        </motion.p>
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Times we've spent.
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Lorem Ipsum is simply dummy text of the printin typesetting dummy text ever when an
          unknown printer took a galley of type and scrambled a type specimen book.
        </motion.p>

        {/* Project Images */}
        <motion.div
          className="flex flex-wrap justify-center -mx-4 overflow-hidden" // Use negative margin to pull images outwards
          variants={imageContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* First and Last images (repeated) */}
          <motion.div variants={imageItemVariants} className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={projectImages[0]}
                alt="Project Image 1"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Middle image */}
          <motion.div variants={imageItemVariants} className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={projectImages[1]}
                alt="Project Image 2"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* First and Last images (repeated) */}
          <motion.div variants={imageItemVariants} className="w-full md:w-1/3 px-4">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={projectImages[2]}
                alt="Project Image 3"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}