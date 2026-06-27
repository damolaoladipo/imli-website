"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "@/_data/imili/testimonials";
import { duration } from "@/lib/motion";

type TestimonialCardStandardProps = {
  item: TestimonialItem;
  className?: string;
};

export function TestimonialCardStandard({
  item,
  className,
}: TestimonialCardStandardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "flex h-[371px] w-[382px] shrink-0 flex-col justify-between rounded-[25px] bg-[#F2F2F2] p-[31px]",
        className,
      )}
      whileHover={
        reduced
          ? undefined
          : {
              y: -2,
              backgroundColor: "#EAEAEA",
              transition: { duration: duration.hover },
            }
      }
    >
      <p className="text-[23px] leading-[1.45] text-[#141414]">{item.quote}</p>
      <div>
        <div className="border-t border-dotted border-[#D4D4D4]" />
        <div className="mt-5 flex items-center gap-3">
          {item.avatarSrc && (
            <Image
              src={item.avatarSrc}
              alt={item.avatarAlt ?? ""}
              width={62}
              height={62}
              className="size-[62px] rounded-[14px] object-cover"
            />
          )}
          <div>
            <p className="text-[20px] font-semibold text-[#111111]">
              {item.name}
            </p>
            <p className="text-[20px] text-[#6B6B6B]">{item.location}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
