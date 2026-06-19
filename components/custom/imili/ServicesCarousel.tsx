"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CarouselNavButton } from "./CarouselNavButton";
import { ServiceCard } from "./ServiceCard";
import type { ServicesSectionContent } from "@/_data/imili/services";
import { fadeIn, fadeUp, motionVariants, viewport } from "@/lib/motion";

const CARD_WIDTH = 382;
const CARD_GAP = 23;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;

type ServicesCarouselProps = {
  content: ServicesSectionContent;
};

export function ServicesCarousel({ content }: ServicesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const showScroll = content.items.length > 3;

  return (
    <section id="services" className="overflow-visible bg-white py-12 md:py-20 lg:py-[68px]">
      <div className="mx-auto container px-4 text-left sm:px-6 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={motionVariants(reduced, {
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          })}
        >
          <motion.span
            className="inline-flex self-start rounded-full border border-[#D1D5DB] px-4 py-1.5 text-[15px] font-medium uppercase tracking-wide text-[#374151]"
            variants={motionVariants(reduced, fadeUp)}
          >
            {content.badge}
          </motion.span>

          <div className="mt-5 flex items-center justify-between gap-6">
            <motion.h2
              className="text-2xl font-bold leading-tight text-[#111111] sm:text-3xl md:text-4xl lg:text-[45px]"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.headingPrefix}
              <span className="text-[#4FAF50]">{content.headingAccent}</span>
            </motion.h2>

            {showScroll ? (
              <motion.div
                className="hidden shrink-0 gap-3 lg:flex"
                variants={motionVariants(reduced, fadeIn)}
              >
                <CarouselNavButton
                  direction="prev"
                  ariaLabel="Previous service"
                  onClick={() => scroll(-1)}
                />
                <CarouselNavButton
                  direction="next"
                  ariaLabel="Next service"
                  onClick={() => scroll(1)}
                />
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        className={
          showScroll
            ? "mt-11 flex snap-x snap-mandatory gap-[23px] overflow-x-auto pl-4 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pl-6 sm:pr-6 [&::-webkit-scrollbar]:hidden lg:px-14"
            : "mx-auto mt-11 grid container grid-cols-1 gap-[23px] px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0"
        }
      >
        {content.items.map((item, index) => (
          <div
            key={item.id}
            className={showScroll ? "w-[min(100%,340px)] shrink-0 snap-start" : undefined}
          >
            <ServiceCard item={item} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
