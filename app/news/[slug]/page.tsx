import { notFound } from "next/navigation";
import { NewsArticleLayout } from "@/components/custom/imili/NewsArticleLayout";
import {
  getPublishedNewsPage,
  getPublishedNewsPages,
} from "@/lib/news-source";
import { siteConfig } from "@/_data/site-config";
import type { NewsArticleData } from "@/types/news";

export { generateMetadata } from "./metadata";

function NewsJsonLd({
  title,
  description,
  date,
  url,
  image,
}: {
  title: string;
  description?: string;
  date: string;
  url: string;
  image: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    datePublished: date,
    url,
    image,
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
  return getPublishedNewsPages().map((page) => ({
    slug: page.url.replace("/news/", ""),
  }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPublishedNewsPage(slug);
  if (!page) notFound();

  const data = page.data as NewsArticleData;
  const MDX = data.body;
  const shareUrl = `${siteConfig.url}/news/${slug}`;

  return (
    <>
      <NewsJsonLd
        title={data.title}
        description={data.description}
        date={data.date}
        url={shareUrl}
        image={`${siteConfig.url}${data.heroImage}`}
      />
      <NewsArticleLayout data={data} slug={slug}>
        <MDX />
      </NewsArticleLayout>
    </>
  );
}
