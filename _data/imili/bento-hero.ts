import { IMILI_IMAGES } from "./images";

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

/** IMILI homepage hero — field lengths aligned to reference placeholders */
export const bentoHeroHomepageContent: BentoHeroContent = {
  headline: "Official MIL Institute ",
  subhead:
    "The first international observatory for media and information literacy development and MIL research.",
  cta: { label: "Learn More", href: "/about" },
  feature: {
    badgeLabel: "Strengthen MIL for a Better Future",
    body: "Catalyst for sustained research on MIL social impact globally.",
  },
  bento: {
    womanPhoto: {
      src: IMILI_IMAGES.humans.src,
      alt: IMILI_IMAGES.humans.alt,
    },
    classroomPhoto: {
      src: IMILI_IMAGES.mission.src,
      alt: IMILI_IMAGES.mission.alt,
      overlayLabel: "Information Literacy Hub",
    },
    testimonial: {
      quote:
        "IMILI reports transformed how I approach media content and analysis.",
      badgeLabel: "Best",
      avatars: [
        { src: IMILI_IMAGES.humans.src, alt: IMILI_IMAGES.humans.alt },
        { src: IMILI_IMAGES.mission.src, alt: IMILI_IMAGES.mission.alt },
        { src: IMILI_IMAGES.vision.src, alt: IMILI_IMAGES.vision.alt },
      ],
    },
    stat: {
      value: "1st",
      label: "UNESCO Category 2 MIL Institute globally.",
    },
    manPhoto: {
      src: IMILI_IMAGES.bgHero.src,
      alt: IMILI_IMAGES.bgHero.alt,
    },
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
    womanPhoto: {
      src: IMILI_IMAGES.humans.src,
      alt: IMILI_IMAGES.humans.alt,
    },
    classroomPhoto: {
      src: IMILI_IMAGES.mission.src,
      alt: IMILI_IMAGES.mission.alt,
      overlayLabel: "Interactive Classrooms",
    },
    testimonial: {
      quote: "Hands-on lessons that helped me apply skills right away.",
      badgeLabel: "Best",
      avatars: [
        { src: IMILI_IMAGES.humans.src, alt: IMILI_IMAGES.humans.alt },
        { src: IMILI_IMAGES.mission.src, alt: IMILI_IMAGES.mission.alt },
        { src: IMILI_IMAGES.vision.src, alt: IMILI_IMAGES.vision.alt },
      ],
    },
    stat: {
      value: "62+",
      label: "Courses built around real-world projects.",
    },
    manPhoto: {
      src: IMILI_IMAGES.bgHero.src,
      alt: IMILI_IMAGES.bgHero.alt,
    },
  },
};
