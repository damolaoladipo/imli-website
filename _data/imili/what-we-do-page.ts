export type WhatWeDoPillarIconName =
  | "book-open"
  | "presentation"
  | "lightbulb"
  | "book-marked"
  | "globe-2";

export type WhatWeDoPillar = {
  id: string;
  title: string;
  description: string;
  icon: WhatWeDoPillarIconName;
};

export type WhatWeDoPageContent = {
  hero: {
    title: string;
    description: string;
  };
  pillars: readonly WhatWeDoPillar[];
};

export const whatWeDoPageContent: WhatWeDoPageContent = {
  hero: {
    title: "What We Do",
    description:
      "IMILI advances media and information literacy through research, capacity building, policy innovation, curriculum integration, and global cooperation.",
  },
  pillars: [
    {
      id: "research-analysis",
      title: "Research & Analysis",
      description:
        "Conducts and promotes rigorous research on Media and Information Literacy, information integrity, artificial intelligence, digital citizenship, misinformation, disinformation, and hate speech to generate reliable evidence, identify emerging trends, and inform effective MIL practices and strategies.",
      icon: "book-open",
    },
    {
      id: "capacity-development",
      title: "Capacity Development",
      description:
        "Strengthen the knowledge, skills and competencies of educators, information professionals, communicators, and community leaders to advance effective Media and Information Literacy education and initiative.",
      icon: "presentation",
    },
    {
      id: "policy-innovation",
      title: "Policy Innovation",
      description:
        "Develop and advocate for forward-looking policies that embed Media and Information Literacy in national priorities and support sustainable MIL environments.",
      icon: "lightbulb",
    },
    {
      id: "curriculum-integration",
      title: "Curriculum Integration",
      description:
        "Promote the integration of Media and Information Literacy across formal and non-formal education systems to empower learners to critically access, evaluate, and create information responsibly.",
      icon: "book-marked",
    },
    {
      id: "global-cooperation",
      title: "Global Cooperation",
      description:
        "Foster international collaboration and knowledge exchange to advance Media and Information Literacy and build a global community committed to informed, inclusive, and democratic societies.",
      icon: "globe-2",
    },
  ],
};
