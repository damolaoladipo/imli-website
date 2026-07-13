import type { Metadata } from "next";
import { siteConfig } from "@/_data/site-config";
import { AfaxPIndexSection } from "@/components/custom/imili/AfaxPIndexSection";

export const metadata: Metadata = {
  title: "Africa Against Xenophobia Project (AfAX-P)",
  description:
    "IMILI's flagship initiative to counter misinformation-driven xenophobia and advance peace across Africa.",
  openGraph: {
    url: `${siteConfig.url}/afax-p`,
    title: `AfAX-P — ${siteConfig.name}`,
    type: "website",
  },
};

export default function AfaxPPage() {
  return <AfaxPIndexSection />;
}
