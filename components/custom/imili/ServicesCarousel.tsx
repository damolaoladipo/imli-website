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
    <section id="services" className="bg-white py-12 md:py-20 lg:py-[68px]">
      <div className="mx-auto container px-4 text-left sm:px-6 lg:px-0">
        <span className="inline-flex self-start rounded-full border border-[#D1D5DB] px-4 py-1.5 text-[15px] font-medium uppercase tracking-wide text-[#374151]">
          {content.badge}
        </span>

        <div className="mt-5 flex items-center justify-between gap-6">
          <h2 className="text-2xl font-bold leading-tight text-[#111111] sm:text-3xl md:text-4xl lg:text-[45px]">
            {content.headingPrefix}
            <span className="text-[#4FAF50]">{content.headingAccent}</span>
          </h2>

          {showScroll ? (
            <div className="hidden shrink-0 gap-3 lg:flex">
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
            </div>
          ) : null}
        </div>
      </div>

      <div
        ref={trackRef}
        className={
          showScroll
            ? "mt-11 flex snap-x snap-mandatory gap-[23px] overflow-x-auto pl-4 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pl-6 sm:pr-6 [&::-webkit-scrollbar]:hidden lg:px-14"
            : "mx-auto mt-11 grid container grid-cols-1 gap-[23px] px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0"
        }
      >
        {content.items.map((item) => (
          <div
            key={item.id}
            className={showScroll ? "w-[min(100%,340px)] shrink-0 snap-start" : undefined}
          >
            <ServiceCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
