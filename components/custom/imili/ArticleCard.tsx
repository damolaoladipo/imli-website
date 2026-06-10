import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className="flex size-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white transition-colors group-hover:border-[#434343] group-hover:bg-[#434343] group-focus-visible:border-[#434343] group-focus-visible:bg-[#434343]"
          aria-hidden
        >
          <ArrowRight className="size-4 text-[#111111] transition-colors group-hover:text-white group-focus-visible:text-white" />
        </span>
        <time className="text-[18px] text-[#6B6B6B]">{item.date}</time>
      </div>

      <h3 className="mt-3.5 text-[25px] font-bold leading-snug text-[#111111]">
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
