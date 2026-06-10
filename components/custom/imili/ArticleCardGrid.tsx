import { Newspaper } from "lucide-react";

import type { ArticleCardGridContent } from "@/_data/imili/article-cards";
import { ArticleCard } from "./ArticleCard";

type ArticleCardGridProps = {
  content: ArticleCardGridContent;
};

export function ArticleCardGrid({ content }: ArticleCardGridProps) {
  return (
    <section id="news-blog" className="bg-stone-100 py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 text-left sm:px-6 lg:px-0">
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#4FAF50] px-4 py-2">
          <Newspaper className="size-4 text-white" aria-hidden />
          <span className="text-base font-medium text-white lg:text-[18px]">
            {content.badgeLabel}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-end">
          <h2 className="text-2xl font-bold leading-tight text-[#111111] sm:text-3xl md:text-4xl lg:text-[48px]">
            {content.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#6B7280] lg:text-right lg:text-[20px]">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="h-full rounded-[20px] bg-[#FAF7F2] p-5"
            >
              <ArticleCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
