import { IMILI_IMAGES } from "./images";

export const imiliHomepageAbout = {
  title: "About the International Media and Information Literacy Institute",
  description:
    "The International Media and Information Literacy Institute (IMILI), being the first of its kind, aims to serve as an international observatory for Media and Information Literacy development and catalyst for sustained research that offer empirical evidence on the social impact of MIL globally.",
  imageSrc: IMILI_IMAGES.mission.src,
  imageAlt: IMILI_IMAGES.mission.alt,
};

export type DocumentarySectionContent = {
  heading: string;
  subtext: string;
  youtubeId: string;
  watchUrl: string;
  embedUrl: string;
};

export const imiliHomepageDocumentary: DocumentarySectionContent = {
  heading: "IMILI Documentary",
  subtext: "Online Version - IMILI Documentary",
  youtubeId: "oH2s7rjl8Os",
  watchUrl: "https://youtu.be/oH2s7rjl8Os",
  embedUrl:
    "https://www.youtube.com/embed/oH2s7rjl8Os?autoplay=1&mute=1&playsinline=1&rel=0",
};
