import { Metadata } from "next";
import { getPublishedProjectPage } from "@/lib/project-source";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";
import type { ProjectData } from "@/types/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublishedProjectPage(slug);

  if (!page) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const data = page.data as ProjectData;
  const canonical = `${siteConfig.url}/projects/${slug}`;
  const ogImage = absoluteOgImageUrl(data.heroImage);
  const title = data.acronym
    ? `${data.acronym} — ${data.title}`
    : data.title;

  return {
    title,
    description: data.description,
    openGraph: {
      title,
      description: data.description,
      type: "article",
      url: canonical,
      publishedTime: data.date,
      images: [{ url: ogImage, alt: data.heroImageAlt }],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: data.description,
      images: [ogImage],
    },
    alternates: { canonical },
  };
}
