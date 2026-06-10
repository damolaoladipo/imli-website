import { IMILI_IMAGES } from "./images";

export type CurvedHeroContent = {
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  cta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
};

/** Layout QA — strings from reference screenshot. */
export const curvedHeroReferenceContent: CurvedHeroContent = {
  headlineLine1: "Lambda – Transforming Lives",
  headlineLine2: "with Compassion",
  body: "Lambda is a dynamic charity donation organization committed to making a positive impact on communities around the world.",
  cta: { label: "Donate Now", href: "#" },
  imageSrc: IMILI_IMAGES.humans.src,
  imageAlt: IMILI_IMAGES.humans.alt,
};
