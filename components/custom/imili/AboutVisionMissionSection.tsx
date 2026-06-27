"use client";

import Image from "next/image";

import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { cn } from "@/lib/utils";

import { ScrollRevealItem, ScrollRevealStagger } from "./scroll-reveal";

type AboutVisionMissionSectionProps = {
  vision: AboutSplitSectionContent;
  mission: AboutSplitSectionContent;
  className?: string;
};

function SectionImage({ content }: { content: AboutSplitSectionContent }) {
  return (
    <div className="rounded-[32px] bg-green-100 p-4 sm:p-5 md:p-6">
      <div className="overflow-hidden rounded-[24px] bg-white p-3 shadow-sm sm:p-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-neutral-100">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

function TextBlock({ content }: { content: AboutSplitSectionContent }) {
  const headingId = `${content.id}-heading`;
  const bodyParagraphs =
    content.paragraphs ?? (content.body ? [content.body] : []);

  return (
    <div className="flex flex-col justify-center">
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
    </div>
  );
}

export function AboutVisionMissionSection({
  vision,
  mission,
  className,
}: AboutVisionMissionSectionProps) {
  return (
    <section
      className={cn("scroll-mt-28 bg-white", className)}
      aria-label="Vision and Mission"
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <ScrollRevealStagger className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div id={vision.id} className="flex flex-col gap-8 lg:gap-10">
            <ScrollRevealItem>
              <TextBlock content={vision} />
            </ScrollRevealItem>
            <ScrollRevealItem>
              <SectionImage content={vision} />
            </ScrollRevealItem>
          </div>

          <div id={mission.id} className="flex flex-col gap-8 lg:gap-10">
            <ScrollRevealItem>
              <SectionImage content={mission} />
            </ScrollRevealItem>
            <ScrollRevealItem>
              <TextBlock content={mission} />
            </ScrollRevealItem>
          </div>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
