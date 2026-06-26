import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { customButtonIconClassName } from "@/components/custom/custom-button";
import type { NewsBlogCardItem } from "@/_data/imili/news-blog";

type NewsBlogCardProps = {
  item: NewsBlogCardItem;
  readMoreLabel: string;
};

export function NewsBlogCard({ item, readMoreLabel }: NewsBlogCardProps) {
  return (
    <Link
      href={item.href}
      className="flex flex-col overflow-hidden rounded-[22px] bg-[#F3F4F6]"
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <div className="relative h-[225px] w-full">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-[#9CA3AF]" aria-hidden />
          <time className="text-[18px] text-[#9CA3AF]">{item.date}</time>
        </div>

        <hr className="mt-4 border-t border-[#E5E7EB]" />

        <h3 className="mt-4 text-[24px] font-bold leading-snug text-[#111111]">
          {item.title}
        </h3>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[20px] text-[#111111]">
          {readMoreLabel}
          <ArrowRight className={customButtonIconClassName} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
