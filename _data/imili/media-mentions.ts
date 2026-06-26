import { STOCK_IMAGES } from "./images";
import type { MediaMention } from "@/types/news";

const { mentions } = STOCK_IMAGES;

export const mediaMentions: MediaMention[] = [
  {
    id: "unesco-abuja",
    outlet: "UNESCO",
    href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
    imageSrc: mentions.unescoAbuja.src,
    imageAlt: mentions.unescoAbuja.alt,
    headline: "IMILI launched in Abuja under UNESCO auspices",
    excerpt:
      "UNESCO formally welcomed the International Media and Information Literacy Institute as a Category 2 centre.",
  },
  {
    id: "arise-tv",
    outlet: "Arise TV",
    href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
    imageSrc: mentions.ariseTv.src,
    imageAlt: mentions.ariseTv.alt,
    headline: "Nigeria launches world's first media literacy institute",
    excerpt:
      "Coverage of Nigeria's partnership with UNESCO to establish the international institute.",
  },
  {
    id: "fmino",
    outlet: "FMINO",
    href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
    imageSrc: mentions.fmino.src,
    imageAlt: mentions.fmino.alt,
    headline: "Official launch and unveiling of IMILI",
    excerpt:
      "Federal Ministry of Information and National Orientation unveils the institute.",
  },
  {
    id: "unesco-policy",
    outlet: "UNESCO",
    href: "https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework",
    imageSrc: mentions.unescoPolicy.src,
    imageAlt: mentions.unescoPolicy.alt,
    headline: "Towards African MIL policy framework",
    excerpt:
      "UNESCO advances dialogue on a regional media and information literacy policy framework.",
  },
];

export function getMediaMentionsForArticle(_slug: string): MediaMention[] {
  return mediaMentions;
}
