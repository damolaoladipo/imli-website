import { Metadata } from "next";
import { getPublishedEssayPage } from "@/lib/essay-source";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";
import type { EssayPageData } from "@/types/essay";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublishedEssayPage(slug);

  if (!page) {
    return {
      title: "Essay Not Found",
      description: "The requested essay could not be found.",
    };
  }

  const data = page.data as EssayPageData;
  const canonical = `${siteConfig.url}/essays/${slug}`;
  const ogImage = data.thumbnail
    ? absoluteOgImageUrl(data.thumbnail)
    : absoluteOgImageUrl();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: canonical,
      publishedTime: data.date,
      tags: data.tags,
      images: [{ url: ogImage, alt: data.title }],
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
