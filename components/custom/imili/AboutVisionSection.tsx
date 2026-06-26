import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { AboutSplitSection } from "./AboutSplitSection";

type AboutVisionSectionProps = {
  content: AboutSplitSectionContent;
};

export function AboutVisionSection({ content }: AboutVisionSectionProps) {
  return <AboutSplitSection content={content} />;
}
