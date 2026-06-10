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
    if (track) {
      track.scrollLeft = INITIAL_SCROLL_OFFSET;
    }
  }, []);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white pb-32 pt-32">
      <div className="px-14">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex rounded-full bg-[#EBEBEB] px-3 py-1.5 text-[12px] font-medium text-[#5A5A5A]">
              {content.badge}
            </span>
            <h2 className="mt-3 text-[51px] font-bold leading-[1.12] text-black">
              {content.headingLine1}
              <br />
              {content.headingLine2}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scroll(-1)}
              className="flex size-[62px] items-center justify-center rounded-full bg-[#EBEBEB] text-[#111111] transition-opacity hover:opacity-80"
            >
              <ChevronLeft className="size-7" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scroll(1)}
              className="flex size-[62px] items-center justify-center rounded-full bg-[#EBEBEB] text-[#111111] transition-opacity hover:opacity-80"
            >
              <ChevronRight className="size-7" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-11 flex gap-[23px] overflow-x-auto px-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
