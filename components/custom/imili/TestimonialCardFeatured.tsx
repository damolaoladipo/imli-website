import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "@/_data/imili/testimonials";

type TestimonialCardFeaturedProps = {
  item: TestimonialItem;
  className?: string;
};

export function TestimonialCardFeatured({
  item,
  className,
}: TestimonialCardFeaturedProps) {
  return (
    <article
      className={cn(
        "relative h-[411px] w-[422px] shrink-0 overflow-hidden rounded-[25px]",
        className,
      )}
    >
      {item.photoSrc && (
        <Image
          src={item.photoSrc}
          alt={item.photoAlt ?? ""}
          fill
          className="object-cover"
          sizes="422px"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-[31px]">
        <p className="text-[21px] leading-[1.45] text-white">{item.quote}</p>
        <div className="mt-4">
          <p className="text-[20px] font-semibold text-white">{item.name}</p>
          <p className="text-[18px] text-white/85">{item.location}</p>
        </div>
      </div>
    </article>
  );
}
