import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TableOfContents } from "@/components/table-of-contents";
import { EssayMobileToc } from "@/components/essay-mobile-toc";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { EssayShareButtons } from "@/components/essay-share-buttons";
import { ReadMoreSection } from "@/components/read-more-section";
import {
  getPublishedEssayPage,
  getPublishedEssayPages,
} from "@/lib/essay-source";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";
import type { EssayPageData } from "@/types/essay";

export { generateMetadata } from "./metadata";

function EssayJsonLd({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description?: string;
  date: string;
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function generateStaticParams() {
  return getPublishedEssayPages().map((page) => ({
    slug: page.url.replace("/essays/", ""),
  }));
}

export default async function EssayPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPublishedEssayPage(slug);
  if (!page) notFound();

  const data = page.data as EssayPageData;
  const MDX = data.body;
  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const shareUrl = `${siteConfig.url}/essays/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      <EssayJsonLd
        title={data.title}
        description={data.description}
        date={data.date}
        url={shareUrl}
      />
      <HashScrollHandler />

      <header>
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pt-28 pb-10 md:pt-32">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/essays" className="hover:text-foreground">
              Essays
            </Link>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time>{formattedDate}</time>
            {data.readTime && (
              <>
                <span>·</span>
                <span>{data.readTime}</span>
              </>
            )}
          </div>

          <EssayShareButtons title={data.title} url={shareUrl} />

          {data.description && (
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          )}

          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {data.thumbnail && (
        <div className="mx-auto max-w-5xl px-6 pt-4">
          <div className="relative aspect-[2/1] w-full overflow-hidden">
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-5xl items-start gap-12 px-6 py-10">
        <main className="min-w-0 flex-1">
          <article
            className="prose prose-lg prose-neutral max-w-none prose-headings:scroll-mt-28 prose-a:text-primary prose-a:underline"
          >
            <MDX />
          </article>

          <div className="mt-8">
            <EssayShareButtons title={data.title} url={shareUrl} />
          </div>

          <ReadMoreSection currentSlug={slug} currentTags={data.tags} />
        </main>

        <aside className="sticky top-28 hidden w-64 shrink-0 lg:block">
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto border border-border bg-card p-5">
            <TableOfContents />
          </div>
        </aside>
      </div>

      <EssayMobileToc />
    </div>
  );
}
