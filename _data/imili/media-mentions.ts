import type { MediaMention } from "@/types/news";

export const mediaMentions: MediaMention[] = [
  {
    id: "unesco-abuja",
    outlet: "UNESCO",
    href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
    imageSrc: "/blocks/img.jpeg",
    imageAlt:
      "Official ribbon-cutting ceremony at an IMILI inauguration event in Abuja",
    headline: "IMILI launched in Abuja under UNESCO auspices",
    excerpt:
      "UNESCO formally welcomed the International Media and Information Literacy Institute as a Category 2 centre.",
  },
  {
    id: "arise-tv",
    outlet: "Arise TV",
    href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
    imageSrc: "/blocks/about.jpeg",
    imageAlt:
      "Official launch of the International Media and Information Literacy Institute with partners and dignitaries in Abuja",
    headline: "Nigeria launches world's first media literacy institute",
    excerpt:
      "Coverage of Nigeria's partnership with UNESCO to establish the international institute.",
  },
  {
    id: "fmino",
    outlet: "FMINO",
    href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
    imageSrc: "/blocks/imili-launch.jpeg",
    imageAlt:
      "Promotional poster for the launch of the International Media and Information Literacy Institute in Abuja",
    headline: "Official launch and unveiling of IMILI",
    excerpt:
      "Federal Ministry of Information and National Orientation unveils the institute.",
  },
  {
    id: "unesco-policy",
    outlet: "UNESCO",
    href: "https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework",
    imageSrc: "/blocks/unesco.jpeg",
    imageAlt: "UNESCO media and information literacy policy framework discussion",
    headline: "Towards African MIL policy framework",
    excerpt:
      "UNESCO advances dialogue on a regional media and information literacy policy framework.",
  },
];

export function getMediaMentionsForArticle(_slug: string): MediaMention[] {
  return mediaMentions;
}
