"use client";

import { Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { BentoHeroContent } from "@/_data/imili/bento-hero";
import { CustomButton } from "@/components/custom/custom-button";
import { fadeUp, motionVariants, staggerContainer } from "@/lib/motion";
import { BentoClassroomTile } from "./BentoClassroomTile";
import { BentoPhotoTile } from "./BentoPhotoTile";
import { BentoStatTile } from "./BentoStatTile";
import { BentoTestimonialTile } from "./BentoTestimonialTile";

type BentoHeroSectionProps = {
  content: BentoHeroContent;
};

export function BentoHeroSection({ content }: BentoHeroSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
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
      <div className="relative mx-auto flex container flex-col gap-20 lg:flex-row">
        <motion.div
          className="flex w-full flex-col justify-between lg:w-[42%]"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={motionVariants(reduced, staggerContainer)}
        >
          <div>
            <motion.h1
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
          className="grid h-[619px] flex-1 grid-cols-2 grid-rows-[1.15fr_0.95fr_0.9fr] gap-5"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={motionVariants(reduced, staggerContainer)}
        >
          <motion.div className="col-start-1 row-start-1" variants={motionVariants(reduced, fadeUp)}>
            <BentoPhotoTile
              className="h-full"
              src={content.bento.womanPhoto.src}
              alt={content.bento.womanPhoto.alt}
            />
          </motion.div>
          <motion.div className="col-start-2 row-start-1" variants={motionVariants(reduced, fadeUp)}>
            <BentoClassroomTile
              className="h-full"
              src={content.bento.classroomPhoto.src}
              alt={content.bento.classroomPhoto.alt}
              overlayLabel={content.bento.classroomPhoto.overlayLabel}
            />
          </motion.div>
          <motion.div className="col-start-1 row-start-2" variants={motionVariants(reduced, fadeUp)}>
            <BentoTestimonialTile
              className="h-full"
              quote={content.bento.testimonial.quote}
              badgeLabel={content.bento.testimonial.badgeLabel}
              avatars={content.bento.testimonial.avatars}
            />
          </motion.div>
          <motion.div className="col-start-1 row-start-3" variants={motionVariants(reduced, fadeUp)}>
            <BentoStatTile
              className="h-full"
              value={content.bento.stat.value}
              label={content.bento.stat.label}
            />
          </motion.div>
          <motion.div
            className="col-start-2 row-span-2 row-start-2"
            variants={motionVariants(reduced, fadeUp)}
          >
            <BentoPhotoTile
              className="h-full"
              src={content.bento.manPhoto.src}
              alt={content.bento.manPhoto.alt}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
