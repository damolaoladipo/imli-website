"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { PlayCircle } from "@phosphor-icons/react";
import { CustomButton } from "@/components/custom/custom-button";

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const mediaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export default function AboutSection() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={contentVariants}
            className="lg:pr-12"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-px bg-gray-400"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                ABOUT IMILI
              </p>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6 max-w-lg">
              International Media and Information Literacy Institute
            </h2>

            <p className="text-lg text-gray-600 mb-4 max-w-xl">
              First international observatory dedicated to media and information literacy.
            </p>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Supporting countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing MIL policies for informed, resilient and peaceful societies.
            </p>

            <CustomButton
              href="/about-us"
              target="_self"
              rel="noopener noreferrer"
            >
              Learn more
            </CustomButton>
          </motion.div>

          {/* Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={mediaVariants}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-xl">
              {/* If playing video show iframe https://youtu.be/OEAsuNHOcGY*/}
              {playVideo ? (
                <iframe
                  className="w-full h-[360px]"
                  src="https://www.youtube.com/embed/OEAsuNHOcGY?autoplay=1"
                  title="YouTube video"
                  allow="autoplay; encrypted media"
                />
              ) : (
                <>
                  <Image
                    src="/new/humans.png"
                    alt="yali network about video"
                    width={700}
                    height={800}
                    className="w-full h-[400px] object-cover"
                  />
                  <button
                    aria-label="Play video"
                    onClick={() => setPlayVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
                  >
                    <PlayCircle
                      size={64}
                      weight="fill"
                      className="text-white/80"
                    />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
