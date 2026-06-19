"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CustomButton } from "@/components/custom/custom-button";
import { fadeUp, motionVariants, viewport, duration, easeOut } from "@/lib/motion";

interface Feature1Props {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
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
  imageSrc = "/new/mision.png",
  imageAlt = "IMILI observatory",
  buttonPrimary = {
    text: "Learn More",
    href: "/about",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "https://shadcnblocks.com",
  },
  className,
}: Feature1Props) => {
  const reduced = useReducedMotion();

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
                className="mb-8 max-w-xl text-base text-muted-foreground lg:text-lg"
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
            className="overflow-hidden rounded-md"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={motionVariants(reduced, fadeUpFromRight)}
            transition={{ delay: reduced ? 0 : 0.1 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={400}
              height={400}
              className="max-h-80 w-full rounded-md object-cover transition-transform duration-500 hover:scale-[1.02] lg:max-h-96"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { AboutUs };
