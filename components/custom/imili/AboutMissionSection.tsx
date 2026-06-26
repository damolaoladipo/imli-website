import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { AboutSplitSection } from "./AboutSplitSection";

type AboutMissionSectionProps = {
  content: AboutSplitSectionContent;
};

export function AboutMissionSection({ content }: AboutMissionSectionProps) {
  return <AboutSplitSection content={content} />;
}
