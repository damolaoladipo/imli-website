"use client";

import { CommunityGrid } from "@/components/custom/community-grid";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden rounded-3xl mx-4 my-4  pb-20 bg-black">
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center px-6 pt-40 pb-8 ">
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white max-w-4xl leading-tight text-balance  bg-neutral-950">
          Join the club
        </h1>
        <p className="mt-6 text-white text-base md:text-lg max-w-xl text-pretty">
         We believe every young person deserves a balanced, connected, and fulfilling experience as they navigate life in a new community
        </p>

        <Button asChild size="lg" className="pr-4.5 rounded-full">
          <Link
            href="#contact"
            className="group mt-12 inline-flex w-fit items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3 font-medium text-white transition-colors"
          >
            Join today
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </Button>
      </div>

      {/* Community Grid */}
      <CommunityGrid />
    </section>
  );
}
