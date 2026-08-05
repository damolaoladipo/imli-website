import { notFound } from "next/navigation";
import {
  getNewsletterBySlug,
  getPublishedNewsletters,
} from "@/_data/imili/newsletters";
import { siteConfig } from "@/_data/site-config";
import { NewsletterDetailSection } from "@/components/custom/imili/NewsletterDetailSection";

export { generateMetadata } from "./metadata";

export function generateStaticParams() {
  return getPublishedNewsletters().map((edition) => ({
    slug: edition.slug,
  }));
}

export default async function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edition = getNewsletterBySlug(slug);
  if (!edition) notFound();

  const shareUrl = `${siteConfig.url.replace(/\/$/, "")}/resources/newsletter/${slug}`;

  return <NewsletterDetailSection edition={edition} shareUrl={shareUrl} />;
}
