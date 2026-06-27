import type { StockImage } from "./images";

const block = (file: string, alt: string): StockImage => ({
  src: `/blocks/${file}`,
  alt,
});

export const imiliHomepageAbout = {
  title: "About the International Media and Information Literacy Institute",
  description:
    "The International Media and Information Literacy Institute (IMILI), being the first of its kind, aims to serve as an international observatory for Media and Information Literacy development and catalyst for sustained research that offer empirical evidence on the social impact of MIL globally.",
  images: [
    block(
      "about.jpeg",
      "Official launch of the International Media and Information Literacy Institute with partners and dignitaries",
    ),
    block(
      "about2.jpeg",
      "Signing ceremony at the IMILI official launch and unveiling in Abuja",
    ),
    block(
      "about3.jpeg",
      "IMILI launch representatives presenting signed partnership documents",
    ),
  ],
};

export type DocumentarySectionContent = {
  heading: string;
  subtext: string;
  youtubeId: string;
  watchUrl: string;
  embedUrl: string;
};

export const imiliHomepageDocumentary: DocumentarySectionContent = {
  heading: "IMILI at a glance",
  subtext: "Online Version - IMILI Documentary",
  youtubeId: "oH2s7rjl8Os",
  watchUrl: "https://youtu.be/oH2s7rjl8Os",
  embedUrl:
    "https://www.youtube.com/embed/oH2s7rjl8Os?autoplay=1&playsinline=1&rel=0&enablejsapi=1",
};
