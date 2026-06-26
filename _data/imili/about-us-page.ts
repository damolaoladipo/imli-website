import { STOCK_IMAGES } from "./images";
import { siteConfig } from "@/_data/site-config";

export type AboutSectionImage = {
  src: string;
  alt: string;
};

export type AboutSplitSectionContent = {
  id: string;
  title: string;
  body: string;
  image: AboutSectionImage;
  layout: "text-first" | "image-first";
};

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
  whatWeAre: {
    id: "what-we-are",
    title: "What We Are",
    body: "IMILI serves as a global centre for research, training, policy innovation, and international cooperation aimed at strengthening information integrity, digital literacy, and responsible media engagement in the digital age. Our establishment is a direct response to the escalating global threats posed by misinformation, disinformation, hate speech, deepfakes, algorithmic manipulation, and the rapid expansion of Artificial Intelligence and emerging technologies.",
    image: STOCK_IMAGES.home.about,
    layout: "text-first",
  },
  vision: {
    id: "vision",
    title: "Vision",
    body: "A world that embraces the value of Media and Information Literacy for the future we desire, recognizes the importance of empirical evidence on the impact of MIL, and ensures that MIL is inclusively, sustainably, and rightfully accessible to all.",
    image: STOCK_IMAGES.mission.secondary,
    layout: "image-first",
  },
  mission: {
    id: "mission",
    title: "Mission",
    body: "To strengthen research and cooperation that bolster Media and Information Literacy for all for a just, peaceful, and sustainable future.",
    image: STOCK_IMAGES.mission.primary,
    layout: "text-first",
  },
} as const satisfies {
  hero: { title: string; description: string };
  intro: {
    badgeLabel: string;
    headline: { before: string; emphasis: string; after: string };
    description: string;
  };
  whatWeAre: AboutSplitSectionContent;
  vision: AboutSplitSectionContent;
  mission: AboutSplitSectionContent;
};
