"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { navHover, navTap } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CarouselNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
  className?: string;
};

const navClassName =
  "flex size-11 items-center justify-center rounded-full border border-dashed border-[#111111]/25 bg-transparent text-[#111111] transition-opacity hover:opacity-80 lg:size-[62px]";

export function CarouselNavButton({
  direction,
  onClick,
  ariaLabel,
  className,
}: CarouselNavButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={reduced ? undefined : navHover}
      whileTap={reduced ? undefined : navTap}
      className={cn(navClassName, className)}
    >
      {direction === "prev" ? (
        <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden />
      ) : (
        <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden />
      )}
    </motion.button>
  );
}
