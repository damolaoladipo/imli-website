"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type BentoClassroomTileProps = {
  src: string;
  alt: string;
  overlayLabel: string;
  className?: string;
};

export function BentoClassroomTile({
  src,
  alt,
  overlayLabel,
  className,
}: BentoClassroomTileProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("group relative overflow-hidden rounded-[25px]", className)}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      transition={{ duration: duration.hover }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        sizes="(max-width: 1440px) 35vw, 450px"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-10">
        <p className="text-[18px] text-white">{overlayLabel}</p>
      </div>
    </motion.div>
  );
}
