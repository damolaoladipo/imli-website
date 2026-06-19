import { heroHomepageCopy } from "./photo-hero";

export type BackgroundPhotoHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  feature: {
    badgeLabel: string;
    body: string;
  };
  backgroundImage: {
    src: string;
    alt: string;
  };
};

export const backgroundPhotoHeroHomepageContent: BackgroundPhotoHeroContent = {
  ...heroHomepageCopy,
  backgroundImage: {
    src: "/blocks/hero.jpeg",
    alt: "",
  },
};
