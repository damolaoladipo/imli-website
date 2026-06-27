"use client";

import { Layers } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PhotoHeroContent } from "@/_data/imili/photo-hero";
import { CustomButton } from "@/components/custom/custom-button";
import { fadeUp, motionVariants, staggerContainer } from "@/lib/motion";

type PhotoHeroSectionProps = {
  content: PhotoHeroContent;
};

export function PhotoHeroSection({ content }: PhotoHeroSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="photo-hero"
      aria-labelledby="photo-hero-heading"
      className="relative min-h-[739px] bg-[#F5F5F5] px-4 py-20 md:px-[68px]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(224,224,224,0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(224,224,224,0.35) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(46,188,94,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto flex container flex-col gap-12 text-left lg:flex-row lg:gap-20">
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
              className="mt-6 max-w-[534px] text-xl text-[#5C5C5C] md:text-[23px]"
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
            className="mt-10 rounded-[23px] bg-[#ECECEC] p-6"
            variants={motionVariants(reduced, fadeUp)}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-white px-3 py-1.5 text-[17px] font-medium text-[#111111]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2EBC5E] text-white">
                <Layers className="size-3.5" aria-hidden />
              </span>
              {content.feature.badgeLabel}
            </span>
            <p className="mt-3.5 text-xl text-[#4A4A4A]">{content.feature.body}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative min-h-[280px] w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[619px] lg:flex-1"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={motionVariants(reduced, fadeUp)}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[25px]">
            <Image
              src={content.heroImage.src}
              alt={content.heroImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
