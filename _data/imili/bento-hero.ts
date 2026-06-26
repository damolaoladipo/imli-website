import { STOCK_IMAGES } from "./images";
import { heroHomepageCopy } from "./photo-hero";

export type BentoHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  feature: {
    badgeLabel: string;
    body: string;
  };
  bento: {
    womanPhoto: { src: string; alt: string };
    classroomPhoto: { src: string; alt: string; overlayLabel: string };
    testimonial: {
      quote: string;
      badgeLabel: string;
      avatars: { src: string; alt: string }[];
    };
    stat: { value: string; label: string };
    manPhoto: { src: string; alt: string };
  };
};

const { bento } = STOCK_IMAGES;

/** IMILI homepage hero — field lengths aligned to reference placeholders */
export const bentoHeroHomepageContent: BentoHeroContent = {
  ...heroHomepageCopy,
  bento: {
    womanPhoto: bento.woman,
    classroomPhoto: {
      ...bento.classroom,
      overlayLabel: "Information Literacy Hub",
    },
    testimonial: {
      quote:
        "IMILI reports transformed how I approach media content and analysis.",
      badgeLabel: "Best",
      avatars: [...bento.avatars],
    },
    stat: {
      value: "1st",
      label: "UNESCO Category 2 MIL Institute globally.",
    },
    manPhoto: bento.man,
  },
};

export const bentoHeroReferenceContent: BentoHeroContent = {
  headline: "Build Skills That Shape Your Future",
  subhead:
    "Practical online courses designed to help you gain real-world experience and grow with confidence.",
  cta: { label: "Explore Course", href: "/about" },
  feature: {
    badgeLabel: "Built for real growth.",
    body: "Follow guided learning paths from beginner to job-ready level.",
  },
  bento: {
    womanPhoto: bento.woman,
    classroomPhoto: {
      ...bento.classroom,
      overlayLabel: "Interactive Classrooms",
    },
    testimonial: {
      quote: "Hands-on lessons that helped me apply skills right away.",
      badgeLabel: "Best",
      avatars: [...bento.avatars],
    },
    stat: {
      value: "62+",
      label: "Courses built around real-world projects.",
    },
    manPhoto: bento.man,
  },
};
