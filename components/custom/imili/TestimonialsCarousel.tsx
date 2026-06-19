"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CarouselNavButton } from "./CarouselNavButton";
import { TestimonialCardFeatured } from "./TestimonialCardFeatured";
import { TestimonialCardStandard } from "./TestimonialCardStandard";
import type { TestimonialsSectionContent } from "@/_data/imili/testimonials";
import {
  carouselAutoAdvanceMs,
  carouselPauseResumeMs,
  fadeUp,
  motionVariants,
  viewport,
} from "@/lib/motion";

const SCROLL_STEP = 382 + 23;
const INITIAL_SCROLL_OFFSET = SCROLL_STEP;

type TestimonialsCarouselProps = {
  content: TestimonialsSectionContent;
};

export function TestimonialsCarousel({ content }: TestimonialsCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isPaused) pausedRef.current = false;
    }, carouselPauseResumeMs);
  }, [isPaused]);

  const pauseAutoAdvance = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia("(min-width: 1024px)");
    const applyOffset = () => {
      track.scrollLeft = media.matches ? INITIAL_SCROLL_OFFSET : 0;
    };

    applyOffset();
    media.addEventListener("change", applyOffset);
    return () => media.removeEventListener("change", applyOffset);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(
          entry.isIntersecting && entry.intersectionRatio >= 0.35,
        );
      },
      { threshold: [0, 0.35, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        pauseAutoAdvance();
      } else {
        scheduleResume();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pauseAutoAdvance, scheduleResume]);

  useEffect(() => {
    if (reduced || !isVisible) return;

    const interval = setInterval(() => {
      if (pausedRef.current || document.visibilityState === "hidden") return;

      const track = trackRef.current;
      if (!track) return;

      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;

      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
      }
    }, carouselAutoAdvanceMs);

    return () => clearInterval(interval);
  }, [reduced, isVisible]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const scroll = (direction: -1 | 1) => {
    pauseAutoAdvance();
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
    scheduleResume();
  };

  const togglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      pausedRef.current = next;
      if (!next) scheduleResume();
      return next;
    });
  };

  const cardViewport = { once: true, amount: 0.3 };

  return (
    <section
      ref={sectionRef}
      className="overflow-visible bg-white py-12 md:py-20 lg:py-32"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={scheduleResume}
      onFocusCapture={pauseAutoAdvance}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          scheduleResume();
        }
      }}
    >
      <div className="px-4 text-left sm:px-6 lg:px-14">
        <motion.div
          className="flex flex-col items-start gap-4 lg:flex-row lg:items-start lg:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={motionVariants(reduced, {
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          })}
        >
          <div>
            <motion.span
              className="inline-flex rounded-full bg-[#EBEBEB] px-3 py-1.5 text-[12px] font-medium text-[#5A5A5A]"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.badge}
            </motion.span>
            <motion.h2
              className="mt-3 text-2xl font-bold leading-[1.12] text-black sm:text-3xl md:text-4xl lg:text-[51px]"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.headingLine1}
              <br />
              {content.headingLine2}
            </motion.h2>
          </div>
          <motion.div
            className="flex items-center gap-2 lg:shrink-0"
            variants={motionVariants(reduced, fadeUp)}
          >
            <button
              type="button"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Resume testimonials" : "Pause testimonials"}
              onClick={togglePause}
              className="hidden rounded-full border border-dashed border-[#111111]/25 px-4 py-2 text-sm text-[#111111] lg:inline-flex"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <CarouselNavButton
              direction="prev"
              ariaLabel="Previous testimonial"
              onClick={() => scroll(-1)}
            />
            <CarouselNavButton
              direction="next"
              ariaLabel="Next testimonial"
              onClick={() => scroll(1)}
            />
          </motion.div>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        aria-live="polite"
        className="mt-11 flex snap-x snap-mandatory gap-[23px] overflow-x-auto pl-4 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pl-6 sm:pr-6 [&::-webkit-scrollbar]:hidden lg:px-14"
      >
        {content.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial="hidden"
            whileInView="visible"
            viewport={cardViewport}
            variants={motionVariants(reduced, fadeUp)}
            transition={{ delay: reduced ? 0 : index * 0.06 }}
            className="shrink-0 snap-start"
          >
            {item.variant === "featured" ? (
              <TestimonialCardFeatured item={item} />
            ) : (
              <TestimonialCardStandard item={item} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
