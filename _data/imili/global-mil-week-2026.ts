export const UNESCO_MIL_WEEK_URL =
  "https://www.unesco.org/en/articles/global-media-and-information-literacy-week-2026";

export const MIL_WEEK_REGISTER_URL = "https://tally.so/r/Mepyzp";

export const globalMilWeekPageContent = {
  slug: "global-mil-week-2026",
  eyebrow: "UNESCO Global MIL Week",
  title: "Global Media and Information Literacy Week 2026",
  theme: "We All Play a Part",
  tagline: "Media and Information Literacy for the People",
  dateLabel: "24–30 October 2026",
  commemorativeDates: "24–31 October 2026",
  description:
    "UNESCO celebrates Global Media and Information Literacy Week 2026 under the theme “We All Play a Part – Media and Information Literacy for the People.”",
  heroImage: {
    src: "/blocks/mil-2026.png",
    alt: "UNESCO Global MIL Week 2026 banner: We All Play a Part — Media and Information Literacy for the People, 24–30 October",
    width: 1500,
    height: 500,
  },
  websiteCta: {
    label: "Go to website",
    href: UNESCO_MIL_WEEK_URL,
  },
  registerCta: {
    label: "Take action",
    href: MIL_WEEK_REGISTER_URL,
  },
  unescoResource: {
    type: "Official programme",
    title: "Global Media and Information Literacy Week 2026",
    description: "UNESCO’s official page for the week, events, and updates.",
    href: UNESCO_MIL_WEEK_URL,
    actionLabel: "Visit UNESCO",
  },
  overview: {
    id: "overview",
    title: "Overview",
    lead: "The sixth annual Global Media and Information Literacy week gets underway today, running from Wednesday 25th October – Wednesday, 1 November.",
    kicker: "UNESCO outlines the benefit of Media and Information Literacy.",
  },
  about: {
    id: "about",
    title: "Global Media and Information Literacy Week 2026: We All Play a Part",
    paragraphs: [
      "From 24 to 31 October 2026, UNESCO will once again celebrate Global Media and Information Literacy (MIL) Week, the annual international initiative that brings together stakeholders from around the world to promote Media and Information Literacy and raise awareness of its importance in today’s information environment.",
      "The 2026 theme, “We All Play a Part – Media and Information Literacy for the People,” highlights that fostering Media and Information Literacy is a shared responsibility. Policymakers, educators, researchers, journalists, youth, digital content creators, regulators, parents, civil society organizations, and many others all have a role to play in helping people access, evaluate, create, and share information responsibly.",
      "This year’s edition will adopt a decentralised and participatory approach, featuring regional and thematic events organised by UNESCO offices and partners across the globe. These interconnected activities will showcase innovative practices, encourage knowledge exchange, strengthen cross-sector collaboration, and contribute to addressing today’s most pressing information challenges.",
      "The programme of regional and thematic events will be announced in the coming months. We encourage our community to follow the celebrations and explore opportunities to participate in Global Media and Information Literacy Week 2026.",
    ],
  },
  initiatives: {
    id: "initiatives",
    title: "How to take part",
    intro:
      "UNESCO is inviting communities worldwide to contribute through a youth hackathon and a global campaign.",
    items: [
      {
        label: "Youth Hackathon",
        title: "Play Your Part",
        description:
          "Youth Designing the Future of Media and Information Literacy.",
      },
      {
        label: "Global Campaign",
        title: "#WeAllPlayAPart",
        description:
          "Join the movement for Media and Information Literacy.",
      },
    ],
  },
  takeAction: {
    id: "take-action",
    title: "Take action",
    body: "Register to join Media and Information Literacy Week event and follow the celebrations as UNESCO and partners convene stakeholders worldwide.",
  },
  toc: [
    { id: "overview", label: "Overview" },
    { id: "about", label: "About the week" },
    { id: "initiatives", label: "How to take part" },
    { id: "take-action", label: "Take action" },
  ],
} as const;
