"use client";

import Image from "next/image";

import type { WhatWeDoPageContent } from "@/_data/imili/what-we-do-page";
import { cn } from "@/lib/utils";

import { ScrollRevealItem, ScrollRevealStagger } from "./scroll-reveal";

type WhatWeDoPillarsSectionProps = {
  pillars: WhatWeDoPageContent["pillars"];
  className?: string;
};

const pillarCardColors = [
  "bg-green-100",
  "bg-[#E8EBEF]",
  "bg-[#C5FF7C]",
  "bg-[#B8E4FA]",
  "bg-white ring-1 ring-neutral-200",
] as const;

export function WhatWeDoPillarsSection({
  pillars,
  className,
}: WhatWeDoPillarsSectionProps) {
  return (
    <section
      id="what-we-do-pillars"
      aria-label="What we do"
      className={cn("scroll-mt-28 ", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <ScrollRevealStagger className="flex flex-col gap-8 lg:gap-10">
          {pillars.map((pillar, index) => {
            const headingId = `${pillar.id}-heading`;
            const imageFirst = index % 2 === 1;

            return (
              <ScrollRevealItem key={pillar.id}>
                <article
                  id={pillar.id}
                  aria-labelledby={headingId}
                  className={cn(
                    "scroll-mt-28 overflow-hidden rounded-3xl p-8 lg:p-12",
                    pillarCardColors[index % pillarCardColors.length],
                  )}
                >
                  <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                    <div
                      className={cn(
                        "flex shrink-0 flex-col justify-center lg:flex-[2]",
                        imageFirst && "lg:order-2",
                      )}
                    >
                      <h2
                        id={headingId}
                        className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl lg:text-[2rem] lg:leading-tight"
                      >
                        {pillar.title}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-neutral-900 md:mt-6 md:text-xl">
                        {pillar.description}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "relative w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-100",
                        "min-h-[320px] sm:min-h-[380px] lg:min-h-[480px] lg:flex-[3]",
                        imageFirst && "lg:order-1",
                      )}
                    >
                      <Image
                        src={pillar.image.src}
                        alt={pillar.image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    </div>
                  </div>
                </article>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
