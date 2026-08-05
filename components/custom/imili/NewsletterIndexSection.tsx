import Link from "next/link";
import { BookOpen, Calendar, Download } from "lucide-react";
import {
  getNewsletterPath,
  getPublishedNewsletters,
} from "@/_data/imili/newsletters";
import { CustomButton } from "@/components/custom/custom-button";
import {
  customButtonCircleClassName,
  customButtonIconClassName,
  customButtonVariantStyles,
} from "@/components/custom/custom-button-styles";
import { cn } from "@/lib/utils";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function ButtonCircleIcon({
  variant,
  children,
}: {
  variant: "primary" | "outline";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        customButtonCircleClassName,
        customButtonVariantStyles[variant].circle,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function NewsletterIndexSection() {
  const editions = getPublishedNewsletters();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            IMILI Newsletter
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay informed with the latest news, milestones, activities, and
            updates from IMILI.
          </p>
        </div>

        {editions.length === 0 ? (
          <p className="text-body-muted">No newsletter editions published yet.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {editions.map((edition) => {
              const href = getNewsletterPath(edition.slug);
              return (
                <article
                  key={edition.id}
                  className="border-b border-border pb-8 last:border-b-0 last:pb-0"
                >
                  <p className="text-base font-medium text-primary md:text-lg">
                    {edition.edition}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    <Link href={href} className="hover:text-primary">
                      {edition.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-lg text-muted-foreground">
                    {edition.period}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-base text-muted-foreground md:text-lg">
                    <Calendar className="h-4 w-4" aria-hidden />
                    <time dateTime={edition.publishedAt}>
                      {formatDate(edition.publishedAt)}
                    </time>
                  </div>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                    {edition.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <CustomButton
                      href={href}
                      icon={
                        <ButtonCircleIcon variant="primary">
                          <BookOpen
                            className={customButtonIconClassName}
                            strokeWidth={2}
                          />
                        </ButtonCircleIcon>
                      }
                    >
                      Read Newsletter
                    </CustomButton>
                    <CustomButton
                      href={edition.pdfUrl}
                      variant="outline"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={
                        <ButtonCircleIcon variant="outline">
                          <Download
                            className={customButtonIconClassName}
                            strokeWidth={2}
                          />
                        </ButtonCircleIcon>
                      }
                    >
                      Download PDF
                    </CustomButton>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
