import type { AboutSplitSectionContent } from "@/_data/imili/about-us-page";
import { AboutSplitSection } from "./AboutSplitSection";

type AboutWhatWeAreSectionProps = {
  content: AboutSplitSectionContent;
};

export function AboutWhatWeAreSection({ content }: AboutWhatWeAreSectionProps) {
  return <AboutSplitSection content={content} />;
}
