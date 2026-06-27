"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ServiceCardItem } from "@/_data/imili/services";
import { cardHover, fadeUp, motionVariants, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  item: ServiceCardItem;
  index?: number;
};

export function ServiceCard({ item, index = 0 }: ServiceCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "group flex min-h-[394px] w-full flex-col overflow-visible rounded-[22px] bg-[#FAF7F2] p-7 shadow-sm transition-shadow duration-300 lg:shrink-0",
        !reduced && "hover:shadow-md",
      )}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={motionVariants(reduced, fadeUp)}
      transition={{ delay: reduced ? 0 : index * 0.06 }}
      whileHover={reduced ? undefined : cardHover}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex size-12 items-center justify-center rounded-xl bg-white transition-transform duration-300 group-hover:scale-105">
          <Image
            src={item.iconSrc}
            alt={item.iconAlt}
            width={45}
            height={45}
            className="size-11"
          />
        </div>

        <h3 className="mt-4 text-[22px] font-bold text-[#111111]">{item.title}</h3>
        <p className="mt-3 max-w-[90%] text-xl leading-relaxed text-[#6B7280]">
          {item.description}
        </p>

        <Link
          href={item.href}
          className="mt-5 inline-flex w-fit rounded-full border border-[#D1D5DB] bg-white px-5 py-2 text-[17px] text-[#111111] transition-all hover:opacity-90"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {item.ctaLabel}
          </span>
        </Link>
      </div>

      <div className="relative mt-10 h-[140px] w-full shrink-0" aria-hidden>
        <Image
          src={item.illustrationSrc}
          alt=""
          fill
          className="object-contain object-bottom brightness-0 opacity-20 transition-opacity duration-300 group-hover:opacity-[0.28]"
          sizes="382px"
        />
      </div>
    </motion.article>
  );
}
