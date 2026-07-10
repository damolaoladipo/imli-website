import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { articleCardHomepageItems } from "@/_data/imili/article-cards";
import { getPublishedNewsPages } from "@/lib/news-source";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const parseDate = (date: string) => new Date(date).getTime();

type NewsListEntry = {
  key: string;
  href: string;
  external: boolean;
  date: string;
  title: string;
  description?: string;
  heroImage: string;
  heroImageAlt: string;
};

function getExternalPressEntries(): NewsListEntry[] {
  return articleCardHomepageItems
    .filter((item) => item.href.startsWith("http"))
    .map((item) => ({
      key: item.id,
      href: item.href,
      external: true,
      date: item.date,
      title: item.title,
      description: item.summary,
      heroImage: item.imageSrc,
      heroImageAlt: item.imageAlt,
    }));
}

function getOwnedNewsEntries(): NewsListEntry[] {
  return getPublishedNewsPages().map((article) => ({
    key: article.url,
    href: article.url,
    external: false,
    date: article.data.date,
    title: article.data.title,
    description: article.data.description,
    heroImage: article.data.heroImage,
    heroImageAlt: article.data.heroImageAlt,
  }));
}

export function NewsIndexSection() {
  const articles = [...getOwnedNewsEntries(), ...getExternalPressEntries()].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            News
          </h1>
          <p className="text-xl text-muted-foreground">
            Press coverage, launches, and event reports on IMILI and media and
            information literacy.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-body-muted">No news articles published yet.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {articles.map((article) => (
              <Link
                key={article.key}
                href={article.href}
                className="group flex flex-col gap-6 border-b border-border pb-8 sm:flex-row"
                {...(article.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:w-72">
                  <Image
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 18rem"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-base text-muted-foreground md:text-lg">
                    <Calendar className="h-4 w-4" aria-hidden />
                    <time>{formatDate(article.date)}</time>
                  </div>
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary md:text-2xl">
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className="line-clamp-3 text-body-muted">
                      {article.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
