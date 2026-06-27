"use client";

import Image from "next/image";

import type { AboutInstituteContent } from "@/_data/imili/about-us-page";
import { cn } from "@/lib/utils";

import { ScrollRevealItem, ScrollRevealStagger } from "./scroll-reveal";

type AboutInstituteSectionProps = {
  content: AboutInstituteContent;
  className?: string;
};

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 40"
      className={cn("h-9 w-14 text-[#D1D5DB]", className)}
      fill="currentColor"
    >
      <path d="M14 0C6.3 0 0 6.3 0 14c0 5.2 2.4 9.6 6.3 12.5L4 40h13.6l3-12.1C24.7 25.2 28 19.8 28 14 28 6.3 21.7 0 14 0zm28 0C34.3 0 28 6.3 28 14c0 5.2 2.4 9.6 6.3 12.5L32 40h13.6l3-12.1C52.7 25.2 56 19.8 56 14 56 6.3 49.7 0 42 0z" />
    </svg>
  );
}

export function AboutInstituteSection({
  content,
  className,
}: AboutInstituteSectionProps) {
  const headingId = `${content.id}-heading`;

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-28 bg-white", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <h2 id={headingId} className="sr-only">
          {content.accessibleTitle}
        </h2>

        <ScrollRevealStagger className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <ScrollRevealItem className="flex flex-col">
            <QuoteMark />
            <p className="mt-6 max-w-xl text-lg leading-[1.65] text-[#333333] md:text-xl md:leading-[1.7]">
              {content.quote}
            </p>
            <div className="relative mt-8 min-h-[220px] flex-1 overflow-hidden rounded-[24px] bg-neutral-100 sm:min-h-[260px] lg:mt-10 lg:min-h-[280px]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem className="flex min-h-[480px] flex-col rounded-[32px] bg-[#3B4BB3] p-8 sm:p-10 lg:min-h-[520px] lg:p-12">
            <div className="flex items-center justify-end gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00D1B2] lg:text-[15px]">
                {content.card.badgeLabel}
              </span>
              <Image
                src="/blocks/imli-icon.png"
                alt=""
                width={36}
                height={36}
                className="size-9 shrink-0"
                aria-hidden
              />
            </div>

            <div className="my-auto space-y-6 pt-8 lg:space-y-8 lg:pt-10">
              {content.card.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-[1.75] text-white/90 lg:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollRevealItem>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
