import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  reveal: 0.45,
  hover: 0.18,
} as const;

export const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -40px 0px",
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.reveal, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function motionVariants(
  reduced: boolean | null,
  base: Variants,
): Variants {
  if (!reduced) return base;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
  };
}

export const cardHover = {
  y: -4,
  transition: { duration: duration.hover, ease: easeOut },
} as const;

export const navTap = { scale: 0.94 } as const;
export const navHover = { scale: 1.04 } as const;

export const carouselAutoAdvanceMs = 5000;
export const carouselPauseResumeMs = 5000;
