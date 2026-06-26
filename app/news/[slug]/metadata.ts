import { Metadata } from "next";
import { getPublishedNewsPage } from "@/lib/news-source";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";
import type { NewsArticleData } from "@/types/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublishedNewsPage(slug);

  if (!page) {
    return {
      title: "Article Not Found",
      description: "The requested news article could not be found.",
    };
  }

  const data = page.data as NewsArticleData;
  const canonical = `${siteConfig.url}/news/${slug}`;
  const ogImage = absoluteOgImageUrl(data.heroImage);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: canonical,
      publishedTime: data.date,
      images: [{ url: ogImage, alt: data.heroImageAlt }],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [ogImage],
    },
    alternates: { canonical },
  };
}
