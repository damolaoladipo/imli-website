 "use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle, CaretRight } from '@phosphor-icons/react'; // Using Phosphor Icons


export default function AboutUsSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
            variants={itemVariants}
          >
            KNOW ABOUT US
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4"
            variants={itemVariants}
          >
            We are a non-governmental organization
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Suspendisse varius enim elementum tristique.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative rounded-xl overflow-hidden shadow-lg"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/blocks/hero-image.png"
            alt="Group of volunteers smiling"
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="text-white bg-primary p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <PlayCircle size={48} weight="fill" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}