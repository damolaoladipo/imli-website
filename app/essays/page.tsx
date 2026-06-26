import type { Metadata } from "next";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";
import Essays from "@/components/sections/essays";

const essaysOgImage = absoluteOgImageUrl();

export const metadata: Metadata = {
  title: `Essays`,
  description:
    "Long-form writing from the International Media and Information Literacy Institute.",
  openGraph: {
    url: `${siteConfig.url}/essays`,
    title: `Essays — ${siteConfig.name}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: essaysOgImage, alt: `Essays — ${siteConfig.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Essays — ${siteConfig.name}`,
    description: siteConfig.description,
    images: [essaysOgImage],
  },
};

export default function EssaysPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  return <Essays searchParams={searchParams} />;
}
