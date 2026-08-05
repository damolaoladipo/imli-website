import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import type { NewsletterEdition } from "@/_data/imili/newsletters";
import { CustomButton } from "@/components/custom/custom-button";
import {
  customButtonCircleClassName,
  customButtonIconClassName,
  customButtonVariantStyles,
} from "@/components/custom/custom-button-styles";
import { cn } from "@/lib/utils";
import { NewsletterShareButton } from "./NewsletterShareButton";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

type NewsletterDetailSectionProps = {
  edition: NewsletterEdition;
  shareUrl: string;
};

export function NewsletterDetailSection({
  edition,
  shareUrl,
}: NewsletterDetailSectionProps) {
  return (
    <article className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Link
          href="/resources/newsletter"
          className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-foreground md:text-lg"
        >
          <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
          All newsletters
        </Link>

        <p className="mt-8 text-base font-medium text-primary md:text-lg">
          {edition.edition}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {edition.title}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">{edition.period}</p>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          Published{" "}
          <time dateTime={edition.publishedAt}>
            {formatDate(edition.publishedAt)}
          </time>
        </p>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {edition.description}
        </p>

        {edition.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Hashtags">
            {edition.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground md:text-base"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <CustomButton
            href={edition.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={
              <span
                className={cn(
                  customButtonCircleClassName,
                  customButtonVariantStyles.primary.circle,
                )}
                aria-hidden
              >
                <Download
                  className={customButtonIconClassName}
                  strokeWidth={2}
                />
              </span>
            }
          >
            Download Newsletter
          </CustomButton>
          <NewsletterShareButton
            url={shareUrl}
            title={`${edition.title} — ${edition.edition}`}
            text={edition.description}
          />
        </div>

        <div className="mt-10 overflow-hidden rounded-sm border border-border bg-muted/20">
          <iframe
            src={edition.pdfUrl}
            title={`${edition.title} — ${edition.period}`}
            className="h-[70vh] w-full"
          />
        </div>

        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          If the preview does not load,{" "}
          <a
            href={edition.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline hover:text-primary/80"
          >
            open the PDF directly
          </a>
          .
        </p>
      </div>
    </article>
  );
}
