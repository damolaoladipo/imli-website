import { siteConfig } from "./site-config";

export const AboutUsData = {
    heading: `About ${siteConfig.name}`,
    subheading: siteConfig.description,
    image: {
      src: "/new/mision.png",
      alt: "IMILI observatory",
      width: 1248,
      height: 765,
    },
     button: {
    id: "01",
    text: "Read About Us",
    href: "/about",
    variant: "default" as const,
  },
}
