"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12 md:px-20 md:py-20">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex min-h-[38vh] w-full items-center justify-center overflow-hidden rounded-xl text-white sm:min-h-[70vh]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/new/humans.png"
            alt="Children with special needs"
            fill
            priority
            quality={90}
            className="object-cover brightness-[0.4]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-full px-4 text-center sm:max-w-2xl sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-4 text-2xl font-bold leading-tight sm:mb-5 sm:text-4xl md:text-5xl"
          >
            Join AssureUs Club today.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 flex flex-row flex-wrap justify-center gap-2 sm:mt-8 sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 py-4 text-base shadow-lg sm:px-8 sm:py-6 sm:text-lg"
            >
              <Link
                href="#join-volunteer"
                className="group flex w-fit items-center justify-center gap-2 bg-[#22c55e] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#16a34a] sm:py-3"
              >
                Join the club
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-none bg-accent px-6 py-4 text-base shadow-lg hover:bg-gray-100 sm:px-8 sm:py-6 sm:text-lg"
            >
              <Link
                href="#join-volunteer"
                className="group flex w-fit items-center justify-center gap-2 bg-[#22c55e] px-6 py-3.5 font-medium text-black transition-colors hover:bg-[#16a34a] sm:py-3"
              >
                Donate
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
