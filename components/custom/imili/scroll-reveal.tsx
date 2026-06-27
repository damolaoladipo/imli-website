"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { fadeUp, motionVariants, staggerContainer, viewport } from "@/lib/motion";

export function ScrollRevealStagger({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={motionVariants(reduced, staggerContainer)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={motionVariants(reduced, fadeUp)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={motionVariants(reduced, fadeUp)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
