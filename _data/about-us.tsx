import { STOCK_IMAGES } from "@/_data/imili/images";
import { siteConfig } from "@/_data/site-config";

export const AboutUsData = {
  heading: `About ${siteConfig.name}`,
  subheading: siteConfig.description,
  image: {
    src: STOCK_IMAGES.home.about.src,
    alt: STOCK_IMAGES.home.about.alt,
    width: 1248,
    height: 765,
  },
  button: {
    id: "01",
    text: "Read About Us",
    href: "/about",
    variant: "default" as const,
  },
};
