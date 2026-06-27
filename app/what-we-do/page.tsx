import type { Metadata } from "next";

import { whatWeDoPageContent } from "@/_data/imili/what-we-do-page";
import { siteConfig } from "@/_data/site-config";
import { PageHeroSection } from "@/components/custom/imili/PageHeroSection";
import { WhatWeDoPillarsSection } from "@/components/custom/imili/WhatWeDoPillarsSection";

export const metadata: Metadata = {
  title: "What We Do",
  description: whatWeDoPageContent.hero.description,
  openGraph: {
    url: `${siteConfig.url}/what-we-do`,
    title: `What We Do — ${siteConfig.name}`,
    type: "website",
  },
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeroSection
        title={whatWeDoPageContent.hero.title}
        description={whatWeDoPageContent.hero.description}
      />
      <WhatWeDoPillarsSection pillars={whatWeDoPageContent.pillars} />
    </>
  );
}
