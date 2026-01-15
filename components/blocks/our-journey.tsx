 "use client"

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Handshake } from '@phosphor-icons/react'; // Using Phosphor Icons for donation

// --- Framer Motion Variants ---
const textContainerVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.8, // Delay stats appearance
      staggerChildren: 0.15,
    },
  },
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- Stat Item Component (Optional, but good for reusability) ---
interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <motion.div variants={statItemVariants} className="flex flex-col items-start">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </motion.div>
  );
};

// --- Main Journey Section Component ---
export default function OurJourneySection() {
  return (
    <section className="bg-[#fcf7e6] py-20 sm:py-32 rounded-3xl max-w-7xl mx-auto my-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center px-6 lg:px-12">
        
        {/* Left Content (Text and Stats) */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="lg:pr-12"
        >
          <motion.p variants={textItemVariants} className="text-sm font-semibold uppercase tracking-widest text-gray-600 mb-4">
            OUR JOURNEY
          </motion.p>
          <motion.h2 variants={textItemVariants} className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            How we raised 34M
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-lg text-gray-600 mb-12 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-8"
            variants={statsContainerVariants}
          >
            <StatItem value="34M+" label="Donation Received" />
            <StatItem value="400+" label="Volunteers" />
            <StatItem value="20+" label="Care homes" />
          </motion.div>
        </motion.div>

        {/* Right Content (Image) */}
        <motion.div
          className="relative h-96 w-full lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Image
            src="/blocks/hero-image.png"
            alt="A diverse group of smiling people"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}