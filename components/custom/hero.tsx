"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CustomButton } from '@/components/custom/custom-button';
import { siteConfig } from '@/_data/site-config';

export default function Hero() {
  return (

    <div className="pt-10 ">
    <div className="px-4 sm:px-8 md:px-20 py-20 md:py-20">
         <motion.section
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative w-full min-h-[40vh] sm:min-h-[90vh] flex items-center justify-center text-white overflow-hidden rounded-md"
         >
           <div className="absolute inset-0">
             <Image
               src="/new/bg-hero.png"
               alt="IMILI launch event"
               fill
               priority
               quality={90}
               className="object-cover brightness-[0.4]"
             />
           </div>

            <div className="relative z-10 text-center px-4  pt-20 pb-40 flex flex-col items-center sm:px-6 max-w-full sm:max-w-3xl mx-auto">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-300"
                  >
                    {siteConfig.fullName}
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-4xl  md:text-7xl font-bold mb-5 leading-tight"
                  >
                    {siteConfig.name}
                  </motion.h2>

           <p className="mt-6 text-white text-lg md:text-xl max-w-2xl text-pretty">
           {siteConfig.description}
        </p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <CustomButton href="/about-us" className="mt-12">
              Learn more
            </CustomButton>

          </motion.div>
        </div>
      </motion.section>
    </div>
    </div>
  );
}
