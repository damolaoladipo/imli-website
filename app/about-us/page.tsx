import type { Metadata } from "next";

import { aboutUsPageContent } from "@/_data/imili/about-us-page";
import { AboutUsIntroSection } from "@/components/custom/imili/AboutUsIntroSection";
import { PageHeroSection } from "@/components/custom/imili/PageHeroSection";
import { siteConfig } from "@/_data/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutUsPageContent.hero.description,
  openGraph: {
    url: `${siteConfig.url}/about-us`,
    title: `About Us — ${siteConfig.name}`,
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <PageHeroSection
        title={aboutUsPageContent.hero.title}
        description={aboutUsPageContent.hero.description}
      />
      <AboutUsIntroSection content={aboutUsPageContent.intro} />
    </>
  );
}
