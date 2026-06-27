import type { Metadata } from "next";

import { aboutUsPageContent } from "@/_data/imili/about-us-page";
import { AboutInstituteSection } from "@/components/custom/imili/AboutInstituteSection";
import { AboutStrategicObjectivesSection } from "@/components/custom/imili/AboutStrategicObjectivesSection";
import { AboutVisionMissionSection } from "@/components/custom/imili/AboutVisionMissionSection";
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
      <AboutInstituteSection content={aboutUsPageContent.aboutInstitute} />
      <AboutVisionMissionSection
        vision={aboutUsPageContent.vision}
        mission={aboutUsPageContent.mission}
      />
       <AboutWhatWeAreSection content={aboutUsPageContent.whatWeAre} />
    
       <AboutStrategicObjectivesSection
        content={aboutUsPageContent.strategicObjectives}
      />
     
     
      
    </>
  );
}
