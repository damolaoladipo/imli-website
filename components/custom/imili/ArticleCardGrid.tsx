import { Newspaper } from "lucide-react";

import type { ArticleCardGridContent } from "@/_data/imili/article-cards";
import { ArticleCard } from "./ArticleCard";

type ArticleCardGridProps = {
  content: ArticleCardGridContent;
};

export function ArticleCardGrid({ content }: ArticleCardGridProps) {
  return (
    <section id="news-blog" className="bg-stone-100 py-32">
      <div className="mx-auto  container">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#4FAF50] px-4 py-2">
          <Newspaper className="size-4 text-white" aria-hidden />
          <span className="text-[18px] font-medium text-white">
            {content.badgeLabel}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-end">
          <h2 className="text-[48px] font-bold leading-tight text-[#111111]">
            {content.heading}
          </h2>
          <p className="text-[20px] leading-relaxed text-[#6B7280] lg:text-right">
            {content.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
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
