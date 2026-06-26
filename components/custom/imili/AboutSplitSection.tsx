import Image from "next/image";

import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { cn } from "@/lib/utils";

type AboutSplitSectionProps = {
  content: AboutSplitSectionContent;
  className?: string;
};

export function AboutSplitSection({
  content,
  className,
}: AboutSplitSectionProps) {
  const textFirst = content.layout === "text-first";
  const headingId = `${content.id}-heading`;

  const textColumn = (
    <div className="flex flex-col justify-center">
      <h2
        id={headingId}
        className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl"
      >
        {content.title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-neutral-600 md:mt-6 md:text-lg">
        {content.body}
      </p>
    </div>
  );

  const imageColumn = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-28 bg-white", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn(!textFirst && "lg:order-2")}>{textColumn}</div>
          <div className={cn(!textFirst && "lg:order-1")}>{imageColumn}</div>
        </div>
      </div>
    </section>
  );
}
