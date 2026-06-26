import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { customButtonIconClassName, arrowCircleButtonClassName } from "@/components/custom/custom-button";
import { cn } from "@/lib/utils";
import type { ArticleCardItem } from "@/_data/imili/article-cards";

type ArticleCardProps = {
  item: ArticleCardItem;
};

export function ArticleCard({ item }: ArticleCardProps) {
  const isExternal = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      className="group flex flex-col"
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={cn(
            arrowCircleButtonClassName,
            "border border-[#E5E5E5] bg-white transition-colors group-hover:border-[#434343] group-hover:bg-[#434343] group-focus-visible:border-[#434343] group-focus-visible:bg-[#434343]",
          )}
          aria-hidden
        >
          <ArrowRight
            className={cn(
              customButtonIconClassName,
              "text-[#111111] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white group-focus-visible:translate-x-0.5 group-focus-visible:text-white",
            )}
          />
        </span>
        <time className="text-[18px] text-[#6B6B6B]">{item.date}</time>
      </div>

      <h3 className="mt-3.5 text-[25px] font-bold leading-snug text-[#111111] transition-colors group-hover:text-[#0548bd] group-focus-visible:text-[#0548bd]">
        {item.title}
      </h3>
      <p className="mt-5 text-[20px] leading-relaxed text-[#5C5C5C]">
        {item.summary}
      </p>
      <span className="mt-5 inline-flex w-fit rounded-full bg-[#B8E4FA] px-3 py-1.5 text-[17px] font-medium text-[#0B4F7A]">
        {item.category}
      </span>
    </Link>
  );
}
