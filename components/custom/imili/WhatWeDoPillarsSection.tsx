"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  BookOpen,
  Globe2,
  Lightbulb,
  Presentation,
} from "lucide-react";

import type {
  WhatWeDoPageContent,
  WhatWeDoPillarIconName,
} from "@/_data/imili/what-we-do-page";
import { cn } from "@/lib/utils";

import { ScrollRevealItem, ScrollRevealStagger } from "./scroll-reveal";

const iconMap: Record<WhatWeDoPillarIconName, LucideIcon> = {
  "book-open": BookOpen,
  presentation: Presentation,
  lightbulb: Lightbulb,
  "book-marked": BookMarked,
  "globe-2": Globe2,
};

type WhatWeDoPillarsSectionProps = {
  pillars: WhatWeDoPageContent["pillars"];
  className?: string;
};

export function WhatWeDoPillarsSection({
  pillars,
  className,
}: WhatWeDoPillarsSectionProps) {
  return (
    <section
      id="what-we-do-pillars"
      aria-label="What we do"
      className={cn("scroll-mt-28 bg-white", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <ScrollRevealStagger className="flex flex-col gap-12 lg:gap-16">
          {pillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];
            const headingId = `${pillar.id}-heading`;

            return (
              <ScrollRevealItem key={pillar.id}>
                <article
                  id={pillar.id}
                  aria-labelledby={headingId}
                  className={cn(
                    "scroll-mt-28 border-b border-neutral-200 pb-12 last:border-b-0 last:pb-0 lg:pb-16 lg:last:pb-0",
                    index % 2 === 1 && "lg:pl-12",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                      <Icon
                        className="size-5 text-[#111111]"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2
                        id={headingId}
                        className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
                      >
                        {pillar.title}
                      </h2>
                      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl">
                        {pillar.description}
                      </p>
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
