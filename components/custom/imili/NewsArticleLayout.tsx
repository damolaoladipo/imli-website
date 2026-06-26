import Image from "next/image";
import Link from "next/link";
import type { NewsArticleData } from "@/types/news";
import { MediaMentionsSidebar } from "./MediaMentionsSidebar";

type Props = {
  data: NewsArticleData;
  slug: string;
  children: React.ReactNode;
};

export function NewsArticleLayout({ data, slug, children }: Props) {
  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <time className="text-sm font-medium text-muted-foreground">
              {formattedDate}
            </time>

            <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden">
              <Image
                src={data.heroImage}
                alt={data.heroImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {data.title}
            </h1>

            <div className="prose prose-lg prose-neutral mt-8 max-w-none prose-a:text-primary prose-a:underline prose-headings:scroll-mt-28">
              {children}
            </div>

            {data.externalSourceUrl && (
              <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
                Source:{" "}
                <Link
                  href={data.externalSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline"
                >
                  {data.externalSourceLabel ?? "Original coverage"}
                </Link>
              </p>
            )}
          </div>

          <aside className="mt-12 lg:col-span-5 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <MediaMentionsSidebar slug={slug} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
