import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { AboutSplitSection } from "./AboutSplitSection";

type AboutInstituteSectionProps = {
  content: AboutSplitSectionContent;
};

export function AboutInstituteSection({ content }: AboutInstituteSectionProps) {
  return <AboutSplitSection content={content} />;
}
