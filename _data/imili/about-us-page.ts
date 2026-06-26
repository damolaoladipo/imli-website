import { siteConfig } from "@/_data/site-config";

export const aboutUsPageContent = {
  hero: {
    title: "About Us",
    description: siteConfig.description,
  },
  intro: {
    badgeLabel: "Get to Know Us",
    headline: {
      before: "We bring partners together to advance ",
      emphasis:
        "media and information literacy through research, policy innovation, and global cooperation,",
      after: " for informed, resilient, and peaceful societies everywhere.",
    },
    description:
      "The International Media and Information Literacy Institute (IMILI) serves as an international observatory for MIL development—a catalyst for sustained research that offers empirical evidence on the social impact of media and information literacy globally.",
  },
} as const;
