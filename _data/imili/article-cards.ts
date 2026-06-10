import { IMILI_IMAGES } from "./images";

export type ArticleCardItem = {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  summary: string;
  category: string;
};

export type ArticleCardGridContent = {
  badgeLabel: string;
  heading: string;
  description: string;
  items: ArticleCardItem[];
};

/** Layout QA — strings from reference screenshot. */
export const articleCardReferenceItems: ArticleCardItem[] = [
  {
    id: "ref-1",
    href: "#",
    imageSrc: IMILI_IMAGES.humans.src,
    imageAlt: IMILI_IMAGES.humans.alt,
    date: "February 3, 2026",
    title: "The Role of Volunteers in Supporting Children's Futures",
    summary:
      "Volunteers play an essential role in creating caring environments where children feel supported, valued, and encouraged.",
    category: "Community",
  },
  {
    id: "ref-2",
    href: "#",
    imageSrc: IMILI_IMAGES.vision.src,
    imageAlt: IMILI_IMAGES.vision.alt,
    date: "February 3, 2026",
    title: "How Daily Nutrition Shapes a Child's Well-Being",
    summary:
      "Proper daily nutrition supports not only physical growth, but also a child's ability to learn, focus, and feel well.",
    category: "Health",
  },
  {
    id: "ref-3",
    href: "#",
    imageSrc: IMILI_IMAGES.mission.src,
    imageAlt: IMILI_IMAGES.mission.alt,
    date: "February 3, 2026",
    title: "Why Staying in School Changes a Child's Future",
    summary:
      "Staying in school gives children more than education — it offers stability, confidence, and a pathway to long-term opportunity.",
    category: "Education",
  },
];

export const articleCardGridReferenceContent: ArticleCardGridContent = {
  badgeLabel: "News & Blog",
  heading: "Stories and insights",
  description:
    "Feeding families, educating children & rebuilding lives what our impact shows.",
  items: articleCardReferenceItems,
};

/**
 * Homepage — feat-0001 Latest Updates URLs.
 * title / summary / category: TBD until copied from articles.
 */
export const articleCardHomepageItems: ArticleCardItem[] = [
  {
    id: "unesco-abuja",
    href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
    imageSrc: IMILI_IMAGES.mission.src,
    imageAlt: IMILI_IMAGES.mission.alt,
    date: "TBD",
    title: "TBD — UNESCO Abuja launch",
    summary: "TBD",
    category: "TBD",
  },
  {
    id: "arise-tv",
    href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
    imageSrc: IMILI_IMAGES.vision.src,
    imageAlt: IMILI_IMAGES.vision.alt,
    date: "TBD",
    title: "TBD — Arise TV coverage",
    summary: "TBD",
    category: "TBD",
  },
  {
    id: "fmino",
    href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
    imageSrc: IMILI_IMAGES.bgHero.src,
    imageAlt: IMILI_IMAGES.bgHero.alt,
    date: "TBD",
    title: "TBD — FMINO official launch",
    summary: "TBD",
    category: "TBD",
  },
];
