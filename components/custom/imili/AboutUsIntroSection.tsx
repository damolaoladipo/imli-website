import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export type AboutUsIntroContent = {
  badgeLabel: string;
  headline: {
    before: string;
    emphasis: string;
    after: string;
  };
  description: string;
};

type AboutUsIntroSectionProps = {
  content: AboutUsIntroContent;
  className?: string;
};

export function AboutUsIntroSection({
  content,
  className,
}: AboutUsIntroSectionProps) {
  return (
    <section
      aria-labelledby="about-us-intro-heading"
      className={cn("bg-white", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
          <div className="shrink-0 lg:w-[min(100%,220px)] lg:pt-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
              {content.badgeLabel}
              <Sparkles className="size-3.5 text-neutral-500" aria-hidden />
            </span>
          </div>

          <div
            className="hidden self-stretch lg:mx-10 lg:block lg:w-px lg:bg-neutral-200"
            aria-hidden
          />

          <div className="min-w-0 flex-1">
            <h2
              id="about-us-intro-heading"
              className="max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
            >
              {content.headline.before}
              <span className="text-neutral-400">
                {content.headline.emphasis}
              </span>
              {content.headline.after}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-500 md:mt-10 md:text-xl">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
