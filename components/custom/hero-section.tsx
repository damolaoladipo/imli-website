"use client";

import { CommunityGrid } from "@/components/custom/community-grid";
import { CustomButton } from "@/components/custom/custom-button";
import { siteConfig } from "@/_data/site-config";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden rounded-3xl mx-4 my-4  pb-20 bg-black">
      <div className="flex flex-col items-center text-center px-6 pt-40 pb-8 ">
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white max-w-4xl leading-tight text-balance  bg-neutral-950">
          {siteConfig.name}
        </h1>
        <p className="mt-6 text-white text-lg md:text-xl max-w-2xl text-pretty">
          {siteConfig.tagline}
        </p>

        <CustomButton href="/about-us" className="mt-12">
          Learn more
        </CustomButton>
      </div>

      <CommunityGrid />
    </section>
  );
}
