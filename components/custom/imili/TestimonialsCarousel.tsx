"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCardFeatured } from "./TestimonialCardFeatured";
import { TestimonialCardStandard } from "./TestimonialCardStandard";
import type { TestimonialsSectionContent } from "@/_data/imili/testimonials";

const SCROLL_STEP = 382 + 23;
const INITIAL_SCROLL_OFFSET = SCROLL_STEP;

type TestimonialsCarouselProps = {
  content: TestimonialsSectionContent;
};

export function TestimonialsCarousel({ content }: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-12 md:py-20 lg:py-32">
      <div className="px-4 text-left sm:px-6 lg:px-14">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-[#EBEBEB] px-3 py-1.5 text-[12px] font-medium text-[#5A5A5A]">
              {content.badge}
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-[1.12] text-black sm:text-3xl md:text-4xl lg:text-[51px]">
              {content.headingLine1}
              <br />
              {content.headingLine2}
            </h2>
          </div>
          <div className="flex gap-2 lg:shrink-0">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scroll(-1)}
              className="flex size-11 items-center justify-center rounded-full bg-[#EBEBEB] text-[#111111] transition-opacity hover:opacity-80 lg:size-[62px]"
            >
              <ChevronLeft className="size-6 lg:size-7" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scroll(1)}
              className="flex size-11 items-center justify-center rounded-full bg-[#EBEBEB] text-[#111111] transition-opacity hover:opacity-80 lg:size-[62px]"
            >
              <ChevronRight className="size-6 lg:size-7" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-11 flex snap-x snap-mandatory gap-[23px] overflow-x-auto pl-4 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pl-6 sm:pr-6 [&::-webkit-scrollbar]:hidden lg:px-14"
      >
        {content.items.map((item) =>
          item.variant === "featured" ? (
            <TestimonialCardFeatured key={item.id} item={item} />
          ) : (
            <TestimonialCardStandard key={item.id} item={item} />
          ),
        )}
      </div>
    </section>
  );
}
