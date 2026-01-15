import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react'; // Phosphor Icons

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const imageGalleryVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      delay: 0.2, // Delay gallery slightly
    },
  },
};

const galleryItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

// --- Feature Check Item Component ---
interface FeatureCheckProps {
  text: string;
}

const FeatureCheck: React.FC<FeatureCheckProps> = ({ text }) => {
  return (
    <motion.div variants={itemVariants} className="flex items-center space-x-2">
      <CheckCircle size={20} weight="fill" className="text-gray-800" /> {/* Phosphor Icon */}
      <p className="text-base text-gray-700">{text}</p>
    </motion.div>
  );
};

// --- Main Stand With Us Section Component ---
export default function StandWithUsSection() {
  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content (Image Gallery) */}
          <motion.div
            className="relative grid grid-cols-2 gap-6"
            variants={imageGalleryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Image 1 (larger, top-left) */}
            <motion.div variants={galleryItemVariants} className="col-span-2 md:col-span-1 row-span-2 relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/blocks/hero-image.png"
                alt="Protestors holding signs for justice"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Image 2 (top-right) */}
            <motion.div variants={galleryItemVariants} className="col-span-2 md:col-span-1 relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/blocks/hero-image.png"
                alt="Group of people with protest signs"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Image 3 (bottom-right) */}
            <motion.div variants={galleryItemVariants} className="col-span-2 md:col-span-1 relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/blocks/hero-image.png"
                alt="People marching in a parade or protest"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>


          {/* Right Content (Text and Features) */}
          <div className="lg:pl-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.p variants={itemVariants} className="inline-block bg-[#f4e073] text-gray-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
                Why Join with us?
              </motion.p>
              <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                Stand With Us
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-lg">
                When you join the Louisville NAACP, you become part of a powerful network fighting for justice, equality, and opportunity.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                <FeatureCheck text="Build community" />
                <FeatureCheck text="Protect civil rights" />
                <FeatureCheck text="Support education" />
                <FeatureCheck text="Defend voting rights" />
              </div>

              <motion.div variants={itemVariants}>
                <Link href="#explore" passHref className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#f4e073] text-gray-900 hover:bg-[#e0cd6b] h-12 px-6 py-3">
                  Explore More
                  <ArrowRight size={20} className="ml-2" /> {/* Phosphor Icon */}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}