"use client";

import { Newspaper } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { ArticleCardGridContent } from "@/_data/imili/article-cards";
import { fadeUp, motionVariants, viewport } from "@/lib/motion";
import { ArticleCard } from "./ArticleCard";

type ArticleCardGridProps = {
  content: ArticleCardGridContent;
};

export function ArticleCardGrid({ content }: ArticleCardGridProps) {
  const reduced = useReducedMotion();

  return (
    <section id="news-blog" className="overflow-visible bg-stone-100 py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 text-left sm:px-6 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={motionVariants(reduced, {
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          })}
        >
          <motion.div
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#4FAF50] px-4 py-2"
            variants={motionVariants(reduced, fadeUp)}
          >
            <Newspaper className="size-4 text-white" aria-hidden />
            <span className="text-base font-medium text-white lg:text-[18px]">
              {content.badgeLabel}
            </span>
          </motion.div>

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-end">
            <motion.h2
              className="text-2xl font-bold leading-tight text-[#111111] sm:text-3xl md:text-4xl lg:text-[48px]"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.heading}
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed text-[#6B7280] lg:text-right lg:text-xl"
              variants={motionVariants(reduced, fadeUp)}
            >
              {content.description}
            </motion.p>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {content.items.map((item, index) => (
            <motion.div
              key={item.id}
              className="h-full rounded-[20px] bg-[#FAF7F2] p-5"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={motionVariants(reduced, fadeUp)}
              transition={{ delay: reduced ? 0 : index * 0.07 }}
              whileHover={reduced ? undefined : { y: -3 }}
            >
              <ArticleCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
