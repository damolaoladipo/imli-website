import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

import type { MissionSectionContent } from "@/_data/imili/mission-section";
import { MissionPhotoTile } from "./MissionPhotoTile";
import { MissionStatTile } from "./MissionStatTile";

type MissionSectionProps = {
  content: MissionSectionContent;
};

export function MissionSection({ content }: MissionSectionProps) {
  return (
    <section id="mission" className="bg-white py-[68px]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-6 lg:flex-row lg:items-center lg:gap-14">
        <div className="lg:w-[45%]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EBEBEB] px-5 py-2.5">
            <span className="flex size-[34px] items-center justify-center rounded-full bg-[#2EBC5E] text-white">
              <HeartHandshake className="size-4" aria-hidden />
            </span>
            <span className="text-[18px] font-medium text-[#111111]">
              {content.badgeLabel}
            </span>
          </span>

          <h2 className="mt-7 text-[48px] font-bold leading-[1.1] text-[#111111]">
            {content.heading}
          </h2>

          <p className="mt-5 text-[21px] leading-relaxed text-[#6B7280]">
            {content.description}
          </p>

          <Link
            href={content.cta.href}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2EBC5E] px-10 py-5 text-[21px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {content.cta.label}
            <span className="flex size-12 items-center justify-center rounded-full bg-white">
              <ArrowRight className="size-5 text-[#2EBC5E]" aria-hidden />
            </span>
          </Link>
        </div>

        <div className="grid h-[422px] flex-1 grid-cols-2 grid-rows-2 gap-4">
          <MissionPhotoTile
            src={content.primaryPhoto.src}
            alt={content.primaryPhoto.alt}
            showSwirl
            className="col-start-1 row-span-2 row-start-1"
          />
          <MissionStatTile
            value={content.stat.value}
            label={content.stat.label}
            className="col-start-2 row-start-1"
          />
          <MissionPhotoTile
            src={content.secondaryPhoto.src}
            alt={content.secondaryPhoto.alt}
            className="col-start-2 row-start-2"
          />
        </div>
      </div>
    </section>
  );
}
