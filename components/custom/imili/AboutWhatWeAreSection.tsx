"use client";

import Image from "next/image";

import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { cn } from "@/lib/utils";

import { ScrollRevealItem, ScrollRevealStagger } from "./scroll-reveal";

type AboutWhatWeAreSectionProps = {
  content: AboutSplitSectionContent;
  className?: string;
};

export function AboutWhatWeAreSection({
  content,
  className,
}: AboutWhatWeAreSectionProps) {
  const headingId = `${content.id}-heading`;
  const bodyParagraphs =
    content.paragraphs ?? (content.body ? [content.body] : []);

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-28 bg-white", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <ScrollRevealStagger className="grid items-stretch gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <ScrollRevealItem className="flex flex-col justify-center">
            <h2
              id={headingId}
              className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl"
            >
              {content.title}
            </h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-600 md:mt-6 md:text-xl">
              {bodyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem className="relative h-full min-h-[280px] overflow-hidden rounded-2xl bg-neutral-100 sm:min-h-[320px] lg:min-h-0">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </ScrollRevealItem>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
