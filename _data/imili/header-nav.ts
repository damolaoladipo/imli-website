import type { LucideIcon } from "lucide-react";

import { STOCK_IMAGES } from "./images";
import {
  BookMarked,
  BookOpen,
  Building2,
  CalendarDays,
  Clapperboard,
  ClipboardList,
  Globe2,
  FileText,
  FolderKanban,
  GraduationCap,
  Landmark,
  Library,
  Lightbulb,
  Mail,
  Newspaper,
  Presentation,
  Shield,
  UsersRound,
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
    name: "About Us",
    href: "/about-us",
    dropdown: {
      links: [
        {
          label: "About IMILI",
          description: "First international MIL observatory",
          href: "/about-us",
          icon: Building2,
        },
        {
          label: "The Board",
          description: "Governance and institutional leadership",
          href: "/about/board",
          icon: Landmark,
        },
        {
          label: "The Team",
          description: "People behind our mission",
          href: "/about/team",
          icon: UsersRound,
        },
        {
          label: "Scientific Advisory Committee",
          description: "Expert guidance and research counsel",
          href: "/about/scientific-advisory-committee",
          icon: GraduationCap,
        },
        {
          label: "Contact us",
          description: "Reach out to IMILI",
          href: "/contact",
          icon: Mail,
        },
      ],
      images: [
        STOCK_IMAGES.nav.about[0],
        STOCK_IMAGES.nav.about[1],
      ],
    },
  },
  {
    name: "What We Do",
    href: "/what-we-do",
    dropdown: {
      links: [
        {
          label: "Research & Analysis",
          description: "Evidence-based MIL knowledge",
          href: "/what-we-do#research-analysis",
          icon: BookOpen,
        },
        {
          label: "Capacity Development",
          description: "Training and skills building",
          href: "/what-we-do#capacity-development",
          icon: Presentation,
        },
        {
          label: "Policy Innovation",
          description: "Advancing MIL policy frameworks",
          href: "/what-we-do#policy-innovation",
          icon: Lightbulb,
        },
        {
          label: "Curriculum Integration",
          description: "MIL in education systems",
          href: "/what-we-do#curriculum-integration",
          icon: BookMarked,
        },
        {
          label: "Global Cooperation",
          description: "South-South and North-South partnerships",
          href: "/what-we-do#global-cooperation",
          icon: Globe2,
        },
      ],
      images: [
        STOCK_IMAGES.nav.whatWeDo[0],
        STOCK_IMAGES.nav.whatWeDo[1],
      ],
    },
  },
  {
    name: "Activities",
    href: "/activities",
    dropdown: {
      links: [
     
        {
          label: "Projects",
          description: "Research initiatives and calls for papers",
          href: "/projects",
          icon: FolderKanban,
        },
        {
          label: "IMILI Test Series",
          description: "Assessments and literacy evaluations",
          href: "/activities#imili-test-series",
          icon: ClipboardList,
        },
        {
          label: "IMILI Cartoons",
          description: "Visual storytelling for MIL learning",
          href: "/activities#imili-cartoons",
          icon: Clapperboard,
        },
        {
          label: "Events",
          description: "Conferences, workshops and gatherings",
          href: "/activities#events",
          icon: CalendarDays,
        },
      ],
      images: [
        STOCK_IMAGES.nav.activities[0],
        STOCK_IMAGES.nav.activities[1],
      ],
    },
  },
  {
    name: "Resources",
    href: "/resources",
    dropdown: {
      links: [
        {
          label: "MOOCs",
          description: "Online courses and learning",
          href: "/resources/moocs",
          icon: GraduationCap,
        },
        {
          label: "Newsletter",
          description: "Updates from IMILI",
          href: "/resources/newsletter",
          icon: Mail,
        },
        {
          label: "Annual reports",
          description: "Yearly institute reports",
          href: "/resources/annual-reports",
          icon: FileText,
        },
        {
          label: "Publications",
          description: "Research and policy papers",
          href: "/resources/publications",
          icon: BookMarked,
        },
        {
          label: "News",
          description: "Press and event coverage",
          href: "/news",
          icon: Newspaper,
        },
      ],
      images: [
        STOCK_IMAGES.nav.resources[0],
        STOCK_IMAGES.nav.resources[1],
      ],
    },
  },
  
  {
    name: "Gallery",
    href: "/gallery",
  },

];


// {
//   name: "News",
//   href: "/news",
//   dropdown: {
//     links: [
//       {
//         label: "UNESCO Abuja launch",
//         description: "Launched under UNESCO auspices",
//         href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
//         external: true,
//         icon: Newspaper,
//       },
//       {
//         label: "Arise TV story",
//         description: "First media literacy institute",
//         href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
//         external: true,
//         icon: Radio,
//       },
//       {
//         label: "FMINO unveiling",
//         description: "Official IMILI government launch",
//         href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
//         external: true,
//         icon: Newspaper,
//       },
//       {
//         label: "TVC News story",
//         description: "Milestone against public misinformation",
//         href: "/news/fg-describes-imili-launch-as-milestone-against-misinformation",
//         icon: Radio,
//       },
//       {
//         label: "African MIL policy",
//         description: "Towards regional policy framework",
//         href: "https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework",
//         external: true,
//         icon: Newspaper,
//       },
//     ],
//     images: [
//       {
//         src: IMILI_IMAGES.bgHero.src,
//         alt: IMILI_IMAGES.bgHero.alt,
//       },
//       {
//         src: IMILI_IMAGES.humans.src,
//         alt: IMILI_IMAGES.humans.alt,
//       },
//     ],
//   },
// },