"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (

    <div className="pt-10 ">
    <div className="px-4 sm:px-8 md:px-20 py-10 md:py-20">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full min-h-[40vh] sm:min-h-[80vh] flex items-center justify-center text-white overflow-hidden rounded-xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/blocks/new/humans.png"
            alt="Children with special needs"
            fill
            priority
            quality={90}
            className="object-cover brightness-[0.4]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-full sm:max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight"
          >
            Join Club today.
          </motion.h2>

           <p className="mt-6 text-white text-base md:text-lg max-w-xl text-pretty">
         We believe every young person deserves a balanced, connected, and fulfilling experience as they navigate life in a new community.
        </p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg  text-gray-900 rounded-full shadow-lg"
            >
              <Link href="#join-volunteer" 
              className="group flex items-center justify-center mt-12  w-fit gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3 font-medium text-white transition-colors"
              >
                
                Join today
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Button>

          </motion.div>
        </div>
      </motion.section>
    </div>
    </div>
  );
}
