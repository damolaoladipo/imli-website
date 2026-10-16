import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { globalMilWeekPageContent } from "@/_data/imili/global-mil-week-2026";
import { CustomButton } from "@/components/custom/custom-button";
import { HashScrollHandler } from "@/components/hash-scroll-handler";

const content = globalMilWeekPageContent;

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
    >
      {children}
    </h2>
  );
}

function ResourceCard() {
  const resource = content.unescoResource;

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-sm border border-border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
    >
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {resource.type}
      </p>
      <p className="mt-2 text-lg font-semibold text-foreground">
        {resource.title}
      </p>
      <p className="mt-1 text-base leading-relaxed text-muted-foreground">
        {resource.description}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-base font-medium text-primary underline-offset-4 group-hover:underline">
        {resource.actionLabel}
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </a>
  );
}

function OnThisPage({ className }: { className?: string }) {
  return (
    <nav aria-label="On this page" className={className}>
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-2">
        {content.toc.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="text-base text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const actionButtonClassName =
  "max-sm:h-11 max-sm:gap-2 max-sm:pl-3 max-sm:text-sm";

function ActionButtons() {
  return (
    <div className="flex w-full flex-row flex-nowrap items-center gap-2 sm:w-auto sm:gap-3">
      <div className="min-w-0 flex-1 sm:flex-none">
        <CustomButton
          href={content.websiteCta.href}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          className={actionButtonClassName}
        >
          {content.websiteCta.label}
        </CustomButton>
      </div>
      <div className="min-w-0 flex-1 sm:flex-none">
        <CustomButton
          href={content.registerCta.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          fullWidth
          className={actionButtonClassName}
        >
          {content.registerCta.label}
        </CustomButton>
      </div>
    </div>
  );
}

function KeyFacts() {
  return (
    <dl className="space-y-4">
      <div>
        <dt className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Dates
        </dt>
        <dd className="mt-1 text-lg text-foreground">{content.dateLabel}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Commemorative week
        </dt>
        <dd className="mt-1 text-lg text-foreground">
          {content.commemorativeDates}
        </dd>
      </div>
    </dl>
  );
}

export function GlobalMilWeekLayout() {
  return (
    <article className="bg-background">
      <HashScrollHandler />

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                Celebrate with us…
              </p>
              <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                The 2026 Global MIL Week provides a platform for{' '}
                <span className="font-semibold">governments, academia, media organizations, civil society, youth groups, and development partners</span>{' '}
                to raise awareness of the importance of critical thinking, responsible information consumption, and active participation in knowledge societies.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-sm">
                <Image
                  src="/services/image-1.jpeg"
                  alt="2026 Global Media and Information Literacy Week - Stakeholders' Dinner"
                  width={1080}
                  height={1080}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 600px"
                />
              </div>
              <div className="overflow-hidden rounded-sm">
                <Image
                  src="/services/image-2.jpeg"
                  alt="2026 Global Media and Information Literacy Week - We All Play a Part"
                  width={1080}
                  height={1080}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              {content.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-4 text-2xl font-bold text-primary md:text-4xl">
              {content.theme}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {content.tagline}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              {content.dateLabel}
            </p>
            <div className="mt-10">
              <ActionButtons />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <Image
          src={content.heroImage.src}
          alt={content.heroImage.alt}
          width={content.heroImage.width}
          height={content.heroImage.height}
          className="h-auto w-full rounded-sm"
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
        />

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-8">
            <details className="mb-10 rounded-sm border border-border bg-muted/30 p-4 lg:hidden">
              <summary className="min-h-11 cursor-pointer py-2 text-base font-medium text-foreground">
                On this page
              </summary>
              <ul className="mt-4 space-y-2">
                {content.toc.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="text-base text-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <section aria-labelledby={content.about.id}>
              <SectionHeading id={content.about.id}>
                {content.about.title}
              </SectionHeading>
              <div className="mt-6 max-w-3xl space-y-5">
                {content.about.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-xl leading-relaxed text-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 max-w-3xl">
                <ResourceCard />
              </div>
            </section>

            <section
              className="mt-12"
              aria-labelledby={content.initiatives.id}
            >
              <SectionHeading id={content.initiatives.id}>
                {content.initiatives.title}
              </SectionHeading>
              <div className="mt-6 max-w-3xl space-y-5">
                {content.initiatives.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-xl leading-relaxed text-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section
              className="mt-12 rounded-sm border border-border bg-muted/30 p-6 md:p-8"
              aria-labelledby={content.takeAction.id}
            >
              <SectionHeading id={content.takeAction.id}>
                {content.takeAction.title}
              </SectionHeading>
              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-foreground">
                {content.takeAction.body}
              </p>
              <div className="mt-6">
                <ActionButtons />
              </div>
            </section>
          </div>

          <aside className="mt-12 hidden self-start lg:sticky lg:top-28 lg:z-10 lg:col-span-4 lg:mt-0 lg:block">
            <div className="space-y-8 rounded-sm border border-border bg-muted/30 p-6">
              <OnThisPage className="hidden lg:block" />
              <KeyFacts />
              <CustomButton
                href={content.registerCta.href}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {content.registerCta.label}
              </CustomButton>
              <ResourceCard />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
