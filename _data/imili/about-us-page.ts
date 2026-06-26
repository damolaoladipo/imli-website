import type { StockImage } from "./images";

/** Unsplash CDN — see image-attributions.ts for credits. */
const unsplash = (photoId: string, alt: string): StockImage => ({
  src: `https://images.unsplash.com/${photoId}?w=1600&q=80&auto=format&fit=crop`,
  alt,
});

export type AboutSectionImage = {
  src: string;
  alt: string;
};

export type AboutSplitSectionContent = {
  id: string;
  title: string;
  body?: string;
  paragraphs?: readonly string[];
  image: AboutSectionImage;
  layout: "text-first" | "image-first";
};

export type AboutStrategicObjectivesContent = {
  id: string;
  title: string;
  intro: string;
  objectives: readonly string[];
};

export const aboutUsPageContent = {
  hero: {
    title: "About Us",
    description:
      "The International Media and Information Literacy Institute (IMILI) is the world's first UNESCO Category 2 Institute dedicated exclusively to Media and Information Literacy (MIL).",
  },
  whatWeAre: {
    id: "what-we-are",
    title: "What We Are",
    body: "IMILI serves as a global centre for research, training, policy innovation, and international cooperation aimed at strengthening information integrity, digital literacy, and responsible media engagement in the digital age. Our establishment is a direct response to the escalating global threats posed by misinformation, disinformation, hate speech, deepfakes, algorithmic manipulation, and the rapid expansion of Artificial Intelligence and emerging technologies.",
    image: unsplash(
      "photo-1524178232363-1fb2b075b655",
      "Students and educators in a collaborative learning environment",
    ),
    layout: "text-first",
  },
  vision: {
    id: "vision",
    title: "Vision",
    body: "A world that embraces the value of Media and Information Literacy for the future we desire, recognizes the importance of empirical evidence on the impact of MIL, and ensures that MIL is inclusively, sustainably, and rightfully accessible to all.",
    image: unsplash(
      "photo-1573164713714-d95e436ab8d6",
      "Professionals collaborating on media and technology initiatives",
    ),
    layout: "image-first",
  },
  mission: {
    id: "mission",
    title: "Mission",
    body: "To strengthen research and cooperation that bolster Media and Information Literacy for all for a just, peaceful, and sustainable future.",
    image: unsplash(
      "photo-1454165804606-c3d57bc86b40",
      "Research and policy planning for media literacy cooperation",
    ),
    layout: "text-first",
  },
  strategicObjectives: {
    id: "strategic-objectives",
    title: "Strategic Objectives",
    intro:
      "IMILI pursues several strategic objectives designed to advance MIL globally:",
    objectives: [
      "Generate and disseminate collaborative research and intercultural knowledge on Media and Information Literacy for social cohesion, democratic participation, peace, and sustainable development.",
      "Increase the availability and capacity of MIL trainers, educators, policymakers, government officials, community leaders, journalists, influencers, and other stakeholders.",
      "Facilitate multi-stakeholder dialogue and partnerships that accelerate Media and Information Literacy in response to opportunities and challenges arising from digital transformation and emerging technologies.",
      "Provide evidence-based support for the development of national, regional, and international MIL policies and strategies.",
      "Serve as a global observatory for tracking and evaluating Media and Information Literacy development and impact.",
    ],
  },
  aboutInstitute: {
    id: "about-imili",
    title: "About the International Media and Information Literacy Institute",
    paragraphs: [
      "The International Media and Information Literacy Institute (IMILI) is the world's first UNESCO Category 2 Institute dedicated exclusively to Media and Information Literacy (MIL). Established through a partnership between the Federal Government of Nigeria and the United Nations Educational, Scientific and Cultural Organization (UNESCO), IMILI serves as a global hub for research, policy development, capacity building, and international cooperation in Media and Information Literacy. The Institute was officially launched in Abuja in April 2026, marking a significant milestone in global efforts to combat misinformation, disinformation, hate speech, and information disorder while promoting informed citizenship and digital resilience. The establishment of IMILI followed several years of consultations, feasibility assessments, and international advocacy led by the Federal Ministry of Information and National Orientation. In November 2025, UNESCO's General Conference approved the designation of IMILI as a Category 2 Institute under the auspices of UNESCO, recognizing the growing importance of Media and Information Literacy in addressing contemporary challenges associated with digital transformation and information integrity.",
      "Located at the headquarters of the National Open University of Nigeria in Jabi, Abuja, IMILI is strategically positioned to serve Africa and the wider international community through evidence-based research, training, advocacy, and policy support.",
    ],
    image: unsplash(
      "photo-1562774053-701939374585",
      "University campus and institutional headquarters",
    ),
    layout: "text-first",
  },
} as const;
