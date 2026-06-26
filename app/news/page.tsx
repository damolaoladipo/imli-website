import type { Metadata } from "next";
import { siteConfig } from "@/_data/site-config";
import { NewsIndexSection } from "@/components/custom/imili/NewsIndexSection";

export const metadata: Metadata = {
  title: "News",
  description:
    "Press coverage, launches, and event reports on IMILI and media and information literacy.",
  openGraph: {
    url: `${siteConfig.url}/news`,
    title: `News — ${siteConfig.name}`,
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsIndexSection />;
}
