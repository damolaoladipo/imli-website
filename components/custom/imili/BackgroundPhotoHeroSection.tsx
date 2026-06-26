"use client";

import { Layers } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { BackgroundPhotoHeroContent } from "@/_data/imili/background-photo-hero";
import { CustomButton } from "@/components/custom/custom-button";
import { fadeUp, motionVariants, staggerContainer } from "@/lib/motion";

type BackgroundPhotoHeroSectionProps = {
  content: BackgroundPhotoHeroContent;
};

export function BackgroundPhotoHeroSection({
  content,
}: BackgroundPhotoHeroSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="photo-hero"
      aria-labelledby="photo-hero-heading"
      className="relative min-h-[520px] overflow-hidden px-4 py-20 md:px-[68px] lg:min-h-[739px]"
    >
      <Image
        src={content.backgroundImage.src}
        alt={content.backgroundImage.alt}
        fill
        priority
        className="object-cover object-center lg:object-right"
        sizes="100vw"
        aria-hidden={content.backgroundImage.alt === ""}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-r from-white/95 via-white/88 to-white/70 lg:via-white/80 lg:to-transparent"
      />
      <div className="relative z-10 mx-auto flex container flex-col gap-12 text-left lg:flex-row lg:gap-20">
        <motion.div
          className="flex w-full flex-col justify-between lg:w-[42%]"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={motionVariants(reduced, staggerContainer)}
        >
          <div>
            <motion.h1
              id="photo-hero-heading"
              className="text-4xl font-semibold text-balance lg:text-7xl"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.headline}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-[534px] text-lg text-[#5C5C5C] md:text-[21px]"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.subhead}
            </motion.p>
            <motion.div className="mt-8" variants={motionVariants(reduced, fadeUp)}>
              <CustomButton href={content.cta.href}>
                {content.cta.label}
              </CustomButton>
            </motion.div>
          </div>
          <motion.div
            className="mt-10 rounded-[23px] bg-[#ECECEC]/95 p-6"
            variants={motionVariants(reduced, fadeUp)}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-white px-3 py-1.5 text-[17px] font-medium text-[#111111]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2EBC5E] text-white">
                <Layers className="size-3.5" aria-hidden />
              </span>
              {content.feature.badgeLabel}
            </span>
            <p className="mt-3.5 text-[18px] text-[#4A4A4A]">{content.feature.body}</p>
          </motion.div>
        </motion.div>

        <div className="hidden min-h-[619px] flex-1 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
