import { IMILI_IMAGES } from "@/_data/imili/images";

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
  primaryPhoto: {
    src: "/new/humans.png",
    alt: "Placeholder — primary photo layout QA",
  },
  stat: { value: "200+", label: "Dedicated Volunteers" },
  secondaryPhoto: {
    src: "/new/corps.png",
    alt: "Placeholder — secondary photo layout QA",
  },
};

/** IMILI production mission section */
export const missionSectionHomepageContent: MissionSectionContent = {
  badgeLabel: "Our Mission",
  heading: "TBD",
  description: "TBD",
  cta: { label: "Learn more", href: "/about" },
  primaryPhoto: IMILI_IMAGES.mission,
  stat: { value: "TBD", label: "TBD" },
  secondaryPhoto: IMILI_IMAGES.vision,
};
