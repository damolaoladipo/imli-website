import { STOCK_IMAGES } from "./images";

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

const { articles } = STOCK_IMAGES;

/** Layout QA — strings from reference screenshot. */
export const articleCardReferenceItems: ArticleCardItem[] = [
  {
    id: "ref-1",
    href: "#",
    imageSrc: "/blocks/img.jpeg",
    imageAlt:
      "Official ribbon-cutting ceremony at an IMILI inauguration event in Abuja",
    date: "February 3, 2026",
    title: "The Role of Volunteers in Supporting Children's Futures",
    summary:
      "Volunteers play an essential role in creating caring environments where children feel supported, valued, and encouraged.",
    category: "Community",
  },
  {
    id: "ref-2",
    href: "#",
    imageSrc: articles.ariseTv.src,
    imageAlt: articles.ariseTv.alt,
    date: "February 3, 2026",
    title: "How Daily Nutrition Shapes a Child's Well-Being",
    summary:
      "Proper daily nutrition supports not only physical growth, but also a child's ability to learn, focus, and feel well.",
    category: "Health",
  },
  {
    id: "ref-3",
    href: "#",
    imageSrc: articles.fmino.src,
    imageAlt: articles.fmino.alt,
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

export const articleCardHomepageItems: ArticleCardItem[] = [
  {
    id: "unesco-abuja",
    href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
    imageSrc: "/blocks/img.jpeg",
    imageAlt:
      "Official ribbon-cutting ceremony at an IMILI inauguration event in Abuja",
    date: "April 2026",
    title: "Nigeria Gets UNESCO's First International MIL Institute",
    summary:
      "UNESCO formally approved the International Media and Information Literacy Institute in Abuja under its auspices.",
    category: "News",
  },
  {
    id: "arise-tv",
    href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
    imageSrc: "/blocks/about.jpeg",
    imageAlt:
      "Official launch of the International Media and Information Literacy Institute with partners and dignitaries in Abuja",
    date: "April 2026",
    title: "Nigeria Launches World's First Media Literacy Institute",
    summary:
      "Nigeria partners with UNESCO to establish the world's first international media literacy institute.",
    category: "News",
  },
  {
    id: "fmino",
    href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
    imageSrc: "/blocks/imili-launch.jpeg",
    imageAlt:
      "Promotional poster for the launch of the International Media and Information Literacy Institute in Abuja",
    date: "April 2026",
    title: "Official Launch and Unveiling of IMILI in Abuja",
    summary:
      "The Federal Ministry unveils IMILI as Nigeria's milestone in the fight against misinformation.",
    category: "News",
  },
  {
    id: "tvc-news",
    href: "/news/fg-describes-imili-launch-as-milestone-against-misinformation",
    imageSrc: "/blocks/fg.jpeg",
    imageAlt:
      "Federal Government official speaking at the IMILI launch ceremony in Abuja",
    date: "April 2026",
    title: "FG Describes IMILI Launch as Milestone Against Misinformation",
    summary:
      "Government describes the IMILI launch as a major milestone in combating public misinformation.",
    category: "News",
  },

];

export const articleCardGridHomepageContent: ArticleCardGridContent = {
  badgeLabel: "Latest News",
  heading: "News and event reports",
  description:
    "Coverage, launches, and publications on IMILI and media and information literacy.",
  items: articleCardHomepageItems,
};
