import { siteConfig } from "@/_data/site-config";
import { IMILI_IMAGES } from "./images";

export type NewsBlogCardItem = {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  external?: boolean;
};

export type NewsBlogSectionContent = {
  badgeLabel: string;
  heading: string;
  description: string;
  readMoreLabel: string;
  ctaLabel: string;
  ctaHref: string;
  items: NewsBlogCardItem[];
};

export const newsBlogReferenceContent: NewsBlogSectionContent = {
  badgeLabel: "News & Blog",
  heading: "Stories and insights",
  description:
    "Feeding families, educating children & rebuilding lives what our impact shows.",
  readMoreLabel: "Read more",
  ctaLabel: "Explore All Blogs",
  ctaHref: "/news",
  items: [
    {
      id: "ref-1",
      href: "#",
      imageSrc: IMILI_IMAGES.humans.src,
      imageAlt: IMILI_IMAGES.humans.alt,
      date: "February 25, 2026",
      title: "Safe Shelter. Stronger Lives. Sustainable Futures.",
    },
    {
      id: "ref-2",
      href: "#",
      imageSrc: IMILI_IMAGES.vision.src,
      imageAlt: IMILI_IMAGES.vision.alt,
      date: "February 25, 2026",
      title: "Delivering Warm Meals, Spreading Real Hope",
    },
    {
      id: "ref-3",
      href: "#",
      imageSrc: IMILI_IMAGES.mission.src,
      imageAlt: IMILI_IMAGES.mission.alt,
      date: "February 25, 2026",
      title: "Hope That Feeds, Protects, and Uplifts Communities",
    },
  ],
};

export const newsBlogHomepageContent: NewsBlogSectionContent = {
  badgeLabel: "Latest Updates",
  heading: "TBD",
  description: siteConfig.tagline,
  readMoreLabel: "Read more",
  ctaLabel: "TBD",
  ctaHref: "/news",
  items: [
    {
      id: "unesco-abuja",
      href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
      imageSrc: IMILI_IMAGES.humans.src,
      imageAlt: IMILI_IMAGES.humans.alt,
      date: "TBD",
      title: "UNESCO — IMILI launched in Abuja",
      external: true,
    },
    {
      id: "arise-tv",
      href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
      imageSrc: IMILI_IMAGES.vision.src,
      imageAlt: IMILI_IMAGES.vision.alt,
      date: "TBD",
      title: "TBD — Arise TV coverage",
      external: true,
    },
    {
      id: "fmino",
      href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
      imageSrc: IMILI_IMAGES.mission.src,
      imageAlt: IMILI_IMAGES.mission.alt,
      date: "TBD",
      title: "TBD — FMINO official launch",
      external: true,
    },
  ],
};
