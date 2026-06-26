import { STOCK_IMAGES } from "@/_data/imili/images";

export type MissionSectionImage = {
  src: string;
  alt: string;
};

export type MissionSectionContent = {
  badgeLabel: string;
  heading: string;
  description: string;
  cta: { label: string; href: string };
  primaryPhoto: MissionSectionImage;
  stat: { value: string; label: string };
  secondaryPhoto: MissionSectionImage;
};

/** Layout QA — reference strings from mission-section-reference.png */
export const missionSectionReferenceContent: MissionSectionContent = {
  badgeLabel: "Our Mission",
  heading: "Our Inspiring Mission and Ambitious Goals",
  description:
    "Every cause we support is driven by real needs, real people, and real outcomes.",
  cta: { label: "Learn More", href: "/about" },
  primaryPhoto: STOCK_IMAGES.mission.primary,
  stat: { value: "200+", label: "Dedicated Volunteers" },
  secondaryPhoto: STOCK_IMAGES.mission.secondary,
};

/** IMILI production mission section */
export const missionSectionHomepageContent: MissionSectionContent = {
  badgeLabel: "Our Mission",
  heading: "Strengthen Research and Cooperation for MIL",
  description:
    "Strengthen research and cooperation bolstering MIL for a just, peaceful and sustainable future.",
  cta: { label: "Learn More", href: "/about" },
  primaryPhoto: STOCK_IMAGES.mission.primary,
  stat: { value: "1st", label: "UNESCO Category 2 MIL Institute" },
  secondaryPhoto: STOCK_IMAGES.mission.secondary,
};
