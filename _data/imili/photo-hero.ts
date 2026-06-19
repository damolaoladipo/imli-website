/** Shared hero copy — keep in sync across bento, photo, and background variants. */
export const heroHomepageCopy = {
  headline: "Official MIL Institute ",
  subhead:
    "The first international observatory for media and information literacy development and MIL research.",
  cta: { label: "Learn More", href: "/about" },
  feature: {
    badgeLabel: "Strengthen MIL for a Better Future",
    body: "Catalyst for sustained research on MIL social impact globally.",
  },
} as const;

export type PhotoHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  feature: {
    badgeLabel: string;
    body: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
};

export const photoHeroHomepageContent: PhotoHeroContent = {
  ...heroHomepageCopy,
  heroImage: {
    src: "/blocks/hero.jpeg",
    alt: "IMILI and UNESCO institute branding in the lobby",
  },
};
