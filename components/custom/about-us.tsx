"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STOCK_IMAGES } from "@/_data/imili/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CustomButton } from "@/components/custom/custom-button";
import { fadeUp, motionVariants, viewport, duration, easeOut } from "@/lib/motion";

type AboutUsImage = {
  src: string;
  alt: string;
};

interface Feature1Props {
  title?: string;
  description?: string;
  images?: readonly AboutUsImage[];
  buttonPrimary?: {
    text: string;
    href: string;
  };
  buttonSecondary?: {
    text: string;
    href: string;
  };
  className?: string;
}

const defaultImages: readonly AboutUsImage[] = [
  STOCK_IMAGES.home.about,
  STOCK_IMAGES.mission.primary,
  STOCK_IMAGES.mission.secondary,
];

const fadeUpFromRight = {
  hidden: { opacity: 0, y: 20, x: 24 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: duration.reveal, ease: easeOut },
  },
};

const AboutUs = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  images = defaultImages,
  buttonPrimary = {
    text: "Learn More",
    href: "/about-us",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "https://shadcnblocks.com",
  },
  className,
}: Feature1Props) => {
  const reduced = useReducedMotion();
  const [primary, secondary, tertiary] = images;

  return (
    <section
      className={cn(
        "overflow-visible bg-green-100 py-12 md:py-20 lg:py-32",
        className,
      )}
    >
      <div className="container mx-auto px-4 text-left sm:px-6 lg:px-0">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            className="flex flex-col items-start text-left"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={motionVariants(reduced, {
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            })}
          >
            <motion.h2
              className="my-6 mt-0 text-2xl font-semibold text-balance sm:text-3xl md:text-4xl lg:text-5xl"
              variants={motionVariants(reduced, fadeUp)}
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                className="mb-8 max-w-xl text-lg text-muted-foreground lg:text-xl"
                variants={motionVariants(reduced, fadeUp)}
              >
                {description}
              </motion.p>
            )}
            <motion.div
              className="flex flex-col justify-start gap-2 sm:flex-row"
              variants={motionVariants(reduced, fadeUp)}
            >
              <CustomButton href={buttonPrimary.href}>
                {buttonPrimary.text}
              </CustomButton>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid h-[320px] grid-cols-2 grid-rows-2 gap-3 sm:h-[360px] lg:h-[400px] lg:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={motionVariants(reduced, fadeUpFromRight)}
            transition={{ delay: reduced ? 0 : 0.1 }}
          >
            {primary && (
              <div className="relative col-start-1 row-span-2 row-start-1 overflow-hidden rounded-md">
                <Image
                  src={primary.src}
                  alt={primary.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            )}
            {secondary && (
              <div className="relative col-start-2 row-start-1 overflow-hidden rounded-md">
                <Image
                  src={secondary.src}
                  alt={secondary.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            )}
            {tertiary && (
              <div className="relative col-start-2 row-start-2 overflow-hidden rounded-md">
                <Image
                  src={tertiary.src}
                  alt={tertiary.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { AboutUs };
export type { AboutUsImage };
