import Link from "next/link";
import { Newspaper } from "lucide-react";
import { NewsBlogCard } from "./NewsBlogCard";
import type { NewsBlogSectionContent } from "@/_data/imili/news-blog";

type NewsBlogSectionProps = {
  content: NewsBlogSectionContent;
};

export function NewsBlogSection({ content }: NewsBlogSectionProps) {
  return (
    <section id="news-blog" className="bg-white py-[90px]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#4FAF50] px-4 py-2">
          <Newspaper className="size-4 text-white" aria-hidden />
          <span className="text-[18px] font-medium text-[#1A1A1A]">
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

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {content.items.map((item) => (
            <NewsBlogCard
              key={item.id}
              item={item}
              readMoreLabel={content.readMoreLabel}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href={content.ctaHref}
            className="rounded-full bg-[#4FAF50] px-11 py-5 text-[21px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
