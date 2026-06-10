import { Layers } from "lucide-react";
import type { BentoHeroContent } from "@/_data/imili/bento-hero";
import { CustomButton } from "@/components/custom/custom-button";
import { BentoClassroomTile } from "./BentoClassroomTile";
import { BentoPhotoTile } from "./BentoPhotoTile";
import { BentoStatTile } from "./BentoStatTile";
import { BentoTestimonialTile } from "./BentoTestimonialTile";

type BentoHeroSectionProps = {
  content: BentoHeroContent;
};

export function BentoHeroSection({ content }: BentoHeroSectionProps) {
  return (
    <section
      className="relative min-h-[739px] bg-[#F5F5F5] px-4 py-20 md:px-[68px]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(224,224,224,0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(224,224,224,0.35) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(46,188,94,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto flex container flex-col gap-20 lg:flex-row">
        <div className="flex w-full flex-col justify-between lg:w-[42%]">
          <div>
            <h1 className="text-4xl font-semibold text-balance lg:text-7xl">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-[534px] text-lg text-[#5C5C5C] md:text-[21px]">
              {content.subhead}
            </p>
            <CustomButton
              href={content.cta.href}
              className="mt-8 text-lg md:px-8 md:py-4 md:text-[21px]"
            >
              {content.cta.label}
            </CustomButton>
          </div>
          <div className="mt-10 rounded-[23px] bg-[#ECECEC] p-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-white px-3 py-1.5 text-[17px] font-medium text-[#111111]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2EBC5E] text-white">
                <Layers className="size-3.5" aria-hidden />
              </span>
              {content.feature.badgeLabel}
            </span>
            <p className="mt-3.5 text-[18px] text-[#4A4A4A]">{content.feature.body}</p>
          </div>
        </div>

        <div className="grid h-[619px] flex-1 grid-cols-2 grid-rows-[1.15fr_0.95fr_0.9fr] gap-5">
          <BentoPhotoTile
            className="col-start-1 row-start-1"
            src={content.bento.womanPhoto.src}
            alt={content.bento.womanPhoto.alt}
          />
          <BentoClassroomTile
            className="col-start-2 row-start-1"
            src={content.bento.classroomPhoto.src}
            alt={content.bento.classroomPhoto.alt}
            overlayLabel={content.bento.classroomPhoto.overlayLabel}
          />
          <BentoTestimonialTile
            className="col-start-1 row-start-2"
            quote={content.bento.testimonial.quote}
            badgeLabel={content.bento.testimonial.badgeLabel}
            avatars={content.bento.testimonial.avatars}
          />
          <BentoStatTile
            className="col-start-1 row-start-3"
            value={content.bento.stat.value}
            label={content.bento.stat.label}
          />
          <BentoPhotoTile
            className="col-start-2 row-span-2 row-start-2"
            src={content.bento.manPhoto.src}
            alt={content.bento.manPhoto.alt}
          />
        </div>
      </div>
    </section>
  );
}
