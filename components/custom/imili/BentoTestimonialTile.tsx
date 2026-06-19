"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Avatar = { src: string; alt: string };

type BentoTestimonialTileProps = {
  quote: string;
  badgeLabel: string;
  avatars: Avatar[];
  className?: string;
};

export function BentoTestimonialTile({
  quote,
  badgeLabel,
  avatars,
  className,
}: BentoTestimonialTileProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-[25px] bg-[#3CCB6A] p-6",
        className,
      )}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      transition={{ duration: duration.hover }}
    >
      <div className="flex items-start justify-between">
        <div className="flex -space-x-2.5">
          {avatars.map((avatar) => (
            <Image
              key={avatar.src}
              src={avatar.src}
              alt={avatar.alt}
              width={40}
              height={40}
              className="size-10 rounded-full border-2 border-[#3CCB6A] object-cover"
            />
          ))}
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[17px] font-medium text-[#0A3D34]">
          {badgeLabel}
        </span>
      </div>
      <p className="text-[20px] leading-snug text-white">{quote}</p>
    </motion.div>
  );
}
