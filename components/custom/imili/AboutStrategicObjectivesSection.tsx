import type { AboutStrategicObjectivesContent } from "@/_data/imili/about-us-page";
import { cn } from "@/lib/utils";

type AboutStrategicObjectivesSectionProps = {
  content: AboutStrategicObjectivesContent;
  className?: string;
};

export function AboutStrategicObjectivesSection({
  content,
  className,
}: AboutStrategicObjectivesSectionProps) {
  const headingId = `${content.id}-heading`;

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-28 bg-neutral-50", className)}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <h2
          id={headingId}
          className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl"
        >
          {content.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 md:mt-6 md:text-lg">
          {content.intro}
        </p>
        <ul className="mt-8 max-w-4xl space-y-4">
          {content.objectives.map((objective, index) => (
            <li
              key={index}
              className="flex gap-3 text-base leading-relaxed text-neutral-700 md:text-lg"
            >
              <span
                className="mt-2 size-2 shrink-0 rounded-full bg-[#0548bd]"
                aria-hidden
              />
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
