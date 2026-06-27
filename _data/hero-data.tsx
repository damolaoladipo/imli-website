import { siteConfig } from "./site-config";

export const heroData = {
  heading: siteConfig.name,
  subheading: siteConfig.tagline,

  announcement: {
    text: `${siteConfig.fullName}`,
    href: "/about-us"
  },

  button1: {
    id: "01",
    href: "/about-us",
    text: "Learn More",
    variant: "default" as const,
  },
  button2: {
    id: "02",
    href: "/contact",
    text: "Contact Us",
    variant: "glow" as const,
    icon: "Arrow",
  },
};
