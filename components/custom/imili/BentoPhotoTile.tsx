"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type BentoPhotoTileProps = {
  src: string;
  alt: string;
  className?: string;
};

export function BentoPhotoTile({ src, alt, className }: BentoPhotoTileProps) {
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
        sizes="(max-width: 1440px) 30vw, 400px"
      />
    </motion.div>
  );
}
