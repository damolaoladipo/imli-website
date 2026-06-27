"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "@/_data/imili/testimonials";
import { duration } from "@/lib/motion";

type TestimonialCardFeaturedProps = {
  item: TestimonialItem;
  className?: string;
};

export function TestimonialCardFeatured({
  item,
  className,
}: TestimonialCardFeaturedProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "group relative h-[411px] w-[422px] shrink-0 overflow-hidden rounded-[25px]",
        className,
      )}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      transition={{ duration: duration.hover }}
    >
      {item.photoSrc && (
        <Image
          src={item.photoSrc}
          alt={item.photoAlt ?? ""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="422px"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-[31px]">
        <p className="text-[23px] leading-[1.45] text-white">{item.quote}</p>
        <div className="mt-4">
          <p className="text-[20px] font-semibold text-white">{item.name}</p>
          <p className="text-[20px] text-white/85">{item.location}</p>
        </div>
      </div>
    </motion.article>
  );
}
