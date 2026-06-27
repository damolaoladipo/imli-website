import Image from "next/image";
import Link from "next/link";

import type { CurvedHeroContent } from "@/_data/imili/curved-hero";
import { cn } from "@/lib/utils";

const PANEL_CLIP_ID = "curved-hero-panel-clip";

/**
 * Double S-curve top edge (feat-0008): flat top → curve down → vertical → curve right.
 * Coordinates are objectBoundingBox (0–1) relative to the white panel.
 */
const PANEL_CLIP_PATH = `
  M 0,1
  L 0,0
  L 0.68,0
  C 0.76,0 0.8,0.1 0.8,0.18
  L 0.8,0.26
  C 0.8,0.34 0.88,0.4 1,0.4
  L 1,1
  Z
`;

type CurvedHeroSectionProps = {
  content: CurvedHeroContent;
};

export function CurvedHeroSection({ content }: CurvedHeroSectionProps) {
  return (
    <section className="bg-white px-4 py-8 md:px-6">
      <div className="relative mx-auto h-[480px] max-w-7xl overflow-hidden rounded-[40px] md:h-[600px] lg:h-[731px] lg:rounded-[67px]">
        <svg className="absolute h-0 w-0" aria-hidden>
          <defs>
            <clipPath id={PANEL_CLIP_ID} clipPathUnits="objectBoundingBox">
              <path d={PANEL_CLIP_PATH} />
            </clipPath>
          </defs>
        </svg>

        <Image
          src={content.imageSrc}
          alt={content.imageAlt}
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="(max-width: 1440px) 100vw, 1280px"
        />

        <div
          className={cn(
            "absolute bottom-0 left-0 z-10 flex w-full min-h-[220px] flex-col justify-center bg-white p-8",
            "md:w-[65%] md:min-h-[260px] md:p-10",
            "lg:w-[58%] lg:min-h-[306px] lg:p-14",
          )}
          style={{ clipPath: `url(#${PANEL_CLIP_ID})` }}
        >
          <h1 className="text-3xl font-bold leading-[1.1] text-[#1E3D3D] sm:text-4xl lg:text-[51px]">
            {content.headline}
          </h1>

          <div className="mt-5 flex flex-col items-start gap-4 lg:mt-7 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <p className="text-lg leading-relaxed text-[#1E3D3D] md:text-xl lg:max-w-[55%] lg:text-[23px]">
              {content.subhead}
            </p>
            <Link
              href={content.cta.href}
              className="shrink-0 rounded-full bg-[#1E3D3D] px-6 py-3 text-base font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D3D] lg:px-7 lg:py-3.5 lg:text-[20px]"
            >
              {content.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
