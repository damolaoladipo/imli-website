import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { getPublishedNewsPages } from "@/lib/news-source";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function NewsIndexSection() {
  const articles = [...getPublishedNewsPages()].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            News
          </h1>
          <p className="text-lg text-muted-foreground">
            Press coverage, launches, and event reports on IMILI and media and
            information literacy.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-muted-foreground">
            No news articles published yet.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {articles.map((article) => (
              <Link
                key={article.url}
                href={article.url}
                className="group flex flex-col gap-6 border-b border-border pb-8 sm:flex-row"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:w-72">
                  <Image
                    src={article.data.heroImage}
                    alt={article.data.heroImageAlt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 18rem"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden />
                    <time>{formatDate(article.data.date)}</time>
                  </div>
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary md:text-2xl">
                    {article.data.title}
                  </h2>
                  {article.data.description && (
                    <p className="line-clamp-3 text-muted-foreground">
                      {article.data.description}
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
