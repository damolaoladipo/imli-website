"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import type { ServicesSectionContent } from "@/_data/imili/services";

const CARD_WIDTH = 382;
const CARD_GAP = 23;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;

type ServicesCarouselProps = {
  content: ServicesSectionContent;
};

export function ServicesCarousel({ content }: ServicesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const showScroll = content.items.length > 3;

  return (
    <section id="services" className="bg-white py-[68px]">
      <div className="mx-auto container">
        <span className="inline-flex rounded-full border border-[#D1D5DB] px-4 py-1.5 text-[15px] font-medium uppercase tracking-wide text-[#374151]">
          {content.badge}
        </span>

        <div className="mt-5 flex items-center justify-between gap-6">
          <h2 className="text-[45px] font-bold leading-tight text-[#111111]">
            {content.headingPrefix}
            <span className="text-[#4FAF50]">{content.headingAccent}</span>
          </h2>

          {/* <div className="flex shrink-0 gap-3">
            <button
              type="button"
              aria-label="Previous service"
              onClick={() => scroll(-1)}
              className="flex size-[62px] items-center justify-center rounded-full border border-dashed border-[#111111]/25 bg-transparent text-[#111111] transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next service"
              onClick={() => scroll(1)}
              className="flex size-[62px] items-center justify-center rounded-full border border-dashed border-[#111111]/25 bg-transparent text-[#111111] transition-opacity hover:opacity-80"
            >
              <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
          </div> */}
        </div>
      </div>

      <div
        ref={trackRef}
        className={
          showScroll
            ? "mt-11 flex gap-[23px] overflow-x-auto px-4  [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "mx-auto mt-11 grid container grid-cols-1 gap-[23px] px-4 md:grid-cols-3 "
        }
      >
        {content.items.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
