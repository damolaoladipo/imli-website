"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Globe2,
  Handshake,
  UsersRound,
} from "lucide-react";

import type {
  AboutStrategicObjectivesContent,
  StrategicObjectivesCard,
  StrategicObjectivesIconName,
} from "@/_data/imili/about-us-page";
import { cn } from "@/lib/utils";

import { ScrollRevealItem, ScrollRevealStagger } from "./scroll-reveal";

const iconMap: Record<StrategicObjectivesIconName, LucideIcon> = {
  "book-open": BookOpen,
  "users-round": UsersRound,
  handshake: Handshake,
  "globe-2": Globe2,
};

type AboutStrategicObjectivesSectionProps = {
  content: AboutStrategicObjectivesContent;
  className?: string;
};

function StrategicObjectivesIcon({
  icon: Icon,
  variant,
}: {
  icon: LucideIcon;
  variant: StrategicObjectivesCard["variant"];
}) {
  const isAccent = variant === "accent";

  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full",
        isAccent ? "bg-[#0F172A]" : "bg-[#ECEEF2]",
      )}
    >
      <Icon
        className={cn(
          "size-5",
          isAccent ? "text-[#C5FF7C]" : "text-[#111111]",
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    </span>
  );
}

function StrategicObjectivesGridCard({
  card,
}: {
  card: StrategicObjectivesCard;
}) {
  const isAccent = card.variant === "accent";
  const Icon = iconMap[card.icon];

  return (
    <article
      className={cn(
        "flex h-full min-h-[220px] flex-col rounded-[40px] p-8 lg:min-h-[240px] lg:p-10",
        isAccent ? "bg-[#C5FF7C]" : "bg-white",
      )}
    >
      <StrategicObjectivesIcon icon={Icon} variant={card.variant} />
      {/* <h3 className="mt-6 text-[20px] font-semibold leading-snug tracking-tight text-[#111111] lg:text-[22px]">
        {card.title}
      </h3> */}
      <p
        className={cn(
          "mt-3 text-lg font-semibold leading-relaxed lg:text-xl",
          isAccent ? "text-[#111111]/80" : "text-[#6B7280]",
        )}
      >
        {card.description}
      </p>
    </article>
  );
}

function StrategicObjectivesFeatureCard({
  feature,
  headingId,
}: {
  feature: AboutStrategicObjectivesContent["feature"];
  headingId: string;
}) {
  return (
    <article className="relative min-h-[480px] overflow-hidden rounded-[40px] lg:min-h-full lg:row-span-2">
      <Image
        src={feature.image.src}
        alt={feature.image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 42vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
        aria-hidden
      />
      <div className="relative flex h-full min-h-[480px] flex-col justify-between p-8 lg:min-h-full lg:p-10">
        <span className="inline-flex w-fit rounded-full border border-white/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
          {feature.badgeLabel}
        </span>
        <div className="mt-auto max-w-md pt-10">
          <h2
            id={headingId}
            className="text-[32px] font-bold leading-[1.12] tracking-tight text-white lg:text-[40px]"
          >
            {feature.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90 lg:text-xl">
            {feature.intro}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-white/90 lg:text-xl">
            {feature.summary}
          </p>
        </div>
      </div>
    </article>
  );
}

export function AboutStrategicObjectivesSection({
  content,
  className,
}: AboutStrategicObjectivesSectionProps) {
  const headingId = `${content.id}-heading`;

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-28 bg-[#E8EBEF]", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <ScrollRevealStagger className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:grid-rows-2">
          <ScrollRevealItem className="lg:row-span-2">
            <StrategicObjectivesFeatureCard
              feature={content.feature}
              headingId={headingId}
            />
          </ScrollRevealItem>
          {content.cards.map((card, index) => (
            <ScrollRevealItem key={index}>
              <StrategicObjectivesGridCard card={card} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
