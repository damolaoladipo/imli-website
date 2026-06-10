"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CustomButton } from '@/components/custom/custom-button';
import { siteConfig } from '@/_data/site-config';

export default function CallToAction() {
  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12 md:px-20 md:py-20">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex min-h-[38vh] w-full items-center justify-center overflow-hidden rounded-xl text-white sm:min-h-[70vh]"
      >
        <div className="absolute inset-0">
          <Image
            src="/new/humans.png"
            alt="Global collaboration for media literacy"
            fill
            priority
            quality={90}
            className="object-cover brightness-[0.4]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-full px-4 text-center sm:max-w-2xl sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-4 text-2xl font-bold leading-tight sm:mb-5 sm:text-4xl md:text-5xl"
          >
            Partner with {siteConfig.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-base text-zinc-200 sm:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 flex flex-row flex-wrap justify-center gap-2 sm:mt-8 sm:gap-4"
          >
            <CustomButton href="/contact">
              Contact us
            </CustomButton>

            <CustomButton href="/about">
              Learn more
            </CustomButton>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
