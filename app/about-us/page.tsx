import type { Metadata } from "next";

import { aboutUsPageContent } from "@/_data/imili/about-us-page";
import { AboutInstituteSection } from "@/components/custom/imili/AboutInstituteSection";
import { AboutMissionSection } from "@/components/custom/imili/AboutMissionSection";
import { AboutStrategicObjectivesSection } from "@/components/custom/imili/AboutStrategicObjectivesSection";
import { AboutVisionSection } from "@/components/custom/imili/AboutVisionSection";
import { AboutWhatWeAreSection } from "@/components/custom/imili/AboutWhatWeAreSection";
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
      <AboutWhatWeAreSection content={aboutUsPageContent.whatWeAre} />
      <AboutVisionSection content={aboutUsPageContent.vision} />
      <AboutMissionSection content={aboutUsPageContent.mission} />
      <AboutStrategicObjectivesSection
        content={aboutUsPageContent.strategicObjectives}
      />
      <AboutInstituteSection content={aboutUsPageContent.aboutInstitute} />
    </>
  );
}
