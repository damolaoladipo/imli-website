import { cn } from "@/lib/utils";

type PageHeroSectionProps = {
  title: string;
  description: string;
  className?: string;
};

export function PageHeroSection({
  title,
  description,
  className,
}: PageHeroSectionProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className={cn(
        "mx-2.5 mt-2.5 rounded-b-2xl bg-neutral-100 lg:mx-4",
        className,
      )}
    >
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <h1
          id="page-hero-heading"
          className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 md:mt-6 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
