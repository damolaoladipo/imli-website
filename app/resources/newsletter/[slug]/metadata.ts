import { Metadata } from "next";
import {
  getNewsletterBySlug,
  getNewsletterPageTitle,
} from "@/_data/imili/newsletters";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edition = getNewsletterBySlug(slug);

  if (!edition) {
    return {
      title: "Newsletter Not Found",
      description: "The requested newsletter edition could not be found.",
    };
  }

  const title = getNewsletterPageTitle(edition);
  const description = edition.description;
  const canonical = `${siteConfig.url.replace(/\/$/, "")}/resources/newsletter/${slug}`;
  const ogImage = absoluteOgImageUrl();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      publishedTime: edition.publishedAt,
      images: [{ url: ogImage }],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical },
  };
}
