"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  arrowCircleButtonClassName,
  customButtonIconClassName,
} from "@/components/custom/custom-button";
import { navHover, navTap } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CarouselNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
  className?: string;
};

const navClassName = cn(
  arrowCircleButtonClassName,
  "border border-dashed border-[#111111]/25 bg-transparent text-[#111111] transition-opacity hover:opacity-80 lg:size-[62px]",
);

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
        <ArrowLeft className={customButtonIconClassName} strokeWidth={1.5} aria-hidden />
      ) : (
        <ArrowRight className={customButtonIconClassName} strokeWidth={1.5} aria-hidden />
      )}
    </motion.button>
  );
}
