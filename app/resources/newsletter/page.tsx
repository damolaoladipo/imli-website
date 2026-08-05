import type { Metadata } from "next";
import { siteConfig } from "@/_data/site-config";
import { NewsletterIndexSection } from "@/components/custom/imili/NewsletterIndexSection";

export const metadata: Metadata = {
  title: "IMILI Newsletter",
  description:
    "Stay informed with the latest news, milestones, activities, and updates from IMILI.",
  openGraph: {
    url: `${siteConfig.url}/resources/newsletter`,
    title: `IMILI Newsletter — ${siteConfig.name}`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/resources/newsletter`,
  },
};

export default function NewsletterIndexPage() {
  return <NewsletterIndexSection />;
}
