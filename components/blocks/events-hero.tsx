 "use client"


import React from 'react';
import { motion, Variants } from 'framer-motion';
// Using Phosphor Icons instead of Lucide
import { MapPin, CalendarBlank } from '@phosphor-icons/react';

export default function EventHeroSection() {
  // Framer Motion variants for text animations
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const infoVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3, // Stagger appearance slightly after the main heading
      },
    },
  };

  return (
    <section className="bg-yellow-50 py-24 sm:py-32 flex flex-col items-center justify-center min-h-[40vh]">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          A day with our wonderful children
        </motion.h1>

        {/* Event Details */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-lg text-gray-700"
          variants={infoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2">
            {/* Replaced Lucide icons with Phosphor MapPin */}
            <MapPin size={24} weight="regular" className="text-gray-600" />
            <span>Opp Opolo round about, Yenagoa, Bayelsa, Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Replaced Lucide icons with Phosphor CalendarBlank */}
            <CalendarBlank size={24} weight="regular" className="text-gray-600" />
            <span>April 13, 2022 8:30 AM</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}