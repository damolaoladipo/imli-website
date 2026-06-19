import { backgroundPhotoHeroHomepageContent } from "./background-photo-hero";
import { bentoHeroHomepageContent } from "./bento-hero";
import { photoHeroHomepageContent } from "./photo-hero";

/** Homepage hero layout variants (feat-0007, feat-0026, feat-0027). */
export type HomepageHeroVariant = "bento" | "photo" | "background";

/**
 * Active hero on `/` — change to switch layout without code edits elsewhere.
 * - `bento` — 5-cell bento grid (feat-0007)
 * - `photo` — single institute image on the right (feat-0026)
 * - `background` — full-bleed lobby photo, empty right column (feat-0027)
 */
export const homepageHeroVariant: HomepageHeroVariant = "background";

export const homepageHeroContent = {
  bento: bentoHeroHomepageContent,
  photo: photoHeroHomepageContent,
  background: backgroundPhotoHeroHomepageContent,
} as const;
