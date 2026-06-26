import { STOCK_IMAGES } from "./images";

export type CurvedHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
};

export const curvedHeroHomepageContent: CurvedHeroContent = {
  headline: "Official MIL Institute",
  subhead:
    "The first international observatory for media and information literacy development and MIL research.",
  cta: { label: "Learn More", href: "/about" },
  imageSrc: STOCK_IMAGES.curvedHero.src,
  imageAlt: STOCK_IMAGES.curvedHero.alt,
};
