 "use client"
 

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
// Phosphor Icons are not explicitly needed for this specific design,
// as there are no direct icons in the text area.
// However, if you add them later, you'd import them here:
// import { Handshake } from '@phosphor-icons/react';

// Assuming you have a standard Shadcn/UI Button component
import { Button } from '@/components/ui/button';

export default function DonateSection() {
  // Framer Motion variants for text content
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1, // Stagger text elements
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Framer Motion variants for the image
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3, // Image appears slightly after text
      },
    },
  };

  return (
    <section className="bg-yellow-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content Area (Donate message) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={textVariants}
            className="lg:pr-12"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-px bg-gray-400"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                DONATE
              </p>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6 max-w-lg">
              Making a donation for our children.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8 max-w-xl">
              When you donate, you&apos;re supporting effective care to children with
              special needs—an investment in the leaders of tomorrow.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Link href="#donate-now">
                  Donate now
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Media Area (Donation Box Image) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/placeholder/donation-box.jpg" // Placeholder image path
                alt="Person holding a donation box"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}