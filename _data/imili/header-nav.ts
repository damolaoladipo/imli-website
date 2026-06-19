import type { LucideIcon } from "lucide-react";

import { IMILI_IMAGES } from "./images";
import {
  BookOpen,
  Building2,
  CircleHelp,
  Globe2,
  Library,
  Newspaper,
  Radio,
  Users,
} from "lucide-react";

export type HeaderNavImage = {
  src: string;
  alt: string;
};

export type HeaderNavLink = {
  /** 2–3 word heading */
  label: string;
  /** 3–5 word subtext */
  description: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
};

export type HeaderNavDropdown = {
  links: HeaderNavLink[];
  images: [HeaderNavImage, HeaderNavImage];
};

export type HeaderNavItem = {
  name: string;
  href: string;
  dropdown?: HeaderNavDropdown;
};

export const headerNavItems: HeaderNavItem[] = [
  {
    name: "About",
    href: "/about",
    dropdown: {
      links: [
        {
          label: "About IMILI",
          description: "First international MIL observatory",
          href: "/about",
          icon: Building2,
        },
        {
          label: "Common questions",
          description: "Answers about our institute",
          href: "/faq",
          icon: CircleHelp,
        },
      ],
      images: [
        {
          src: IMILI_IMAGES.mission.src,
          alt: IMILI_IMAGES.mission.alt,
        },
        {
          src: IMILI_IMAGES.vision.src,
          alt: IMILI_IMAGES.vision.alt,
        },
      ],
    },
  },
  {
    name: "What We Do",
    href: "/what-we-do",
    dropdown: {
      links: [
        {
          label: "Research & analysis",
          description: "Evidence-based MIL knowledge",
          href: "/what-we-do#research",
          icon: BookOpen,
        },
        {
          label: "MIL clearinghouse",
          description: "Best practices and policies",
          href: "/what-we-do#clearinghouse",
          icon: Library,
        },
        {
          label: "Global development agenda",
          description: "SDGs and sustainable dialogue",
          href: "/what-we-do#global-agenda",
          icon: Globe2,
        },
        {
          label: "Convening & networking",
          description: "Global cooperation and consensus",
          href: "/what-we-do#convening",
          icon: Users,
        },
      ],
      images: [
        {
          src: IMILI_IMAGES.humans.src,
          alt: IMILI_IMAGES.humans.alt,
        },
        {
          src: IMILI_IMAGES.vision.src,
          alt: IMILI_IMAGES.vision.alt,
        },
      ],
    },
  },
  {
    name: "Who We Are",
    href: "/who-we-are",
  },
  {
    name: "News",
    href: "/news",
    dropdown: {
      links: [
        {
          label: "UNESCO Abuja launch",
          description: "Launched under UNESCO auspices",
          href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
          external: true,
          icon: Newspaper,
        },
        {
          label: "Arise TV story",
          description: "First media literacy institute",
          href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
          external: true,
          icon: Radio,
        },
        {
          label: "FMINO unveiling",
          description: "Official IMILI government launch",
          href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
          external: true,
          icon: Newspaper,
        },
        {
          label: "TVC News story",
          description: "Milestone against public misinformation",
          href: "https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/",
          external: true,
          icon: Radio,
        },
        {
          label: "African MIL policy",
          description: "Towards regional policy framework",
          href: "https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework",
          external: true,
          icon: Newspaper,
        },
      ],
      images: [
        {
          src: IMILI_IMAGES.bgHero.src,
          alt: IMILI_IMAGES.bgHero.alt,
        },
        {
          src: IMILI_IMAGES.humans.src,
          alt: IMILI_IMAGES.humans.alt,
        },
      ],
    },
  },
  {
    name: "Gallery",
    href: "/gallery",
  },

];
