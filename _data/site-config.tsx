import { STOCK_IMAGES } from "@/_data/imili/images";

function getCanonicalSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const withProtocol = /^https?:\/\//i.test(explicit)
      ? explicit
      : `https://${explicit}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      /* fall through */
    }
  }
  return "https://www.imili.org";
}

const siteUrl = getCanonicalSiteUrl();

export const siteConfig = {
  name: "IMILI",
  fullName: "International Media and Information Literacy Institute",
  title: "IMILI — International Media and Information Literacy Institute",
  tagline:
    "First international observatory dedicated to media and information literacy.",
  description:
    "First international observatory dedicated to media and information literacy. The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies.",
  url: siteUrl,
  getStartedUrl: "/contact",
  ogImage: STOCK_IMAGES.og.default.src,
  baseLinks: {
    home: "/",
    essays: "/essays",
    about: "/about-us",
    whatWeDo: "/what-we-do",
    news: "/news",
    projects: "/projects",
    contact: "/contact",
  },
  links: {
    twitter: "https://x.com/IMILinstitute",
    instagram: "https://www.instagram.com/imilinstitute",
    linkedin: "https://www.linkedin.com/in/imil-institute-7707a3377",
    facebook: "https://www.facebook.com/share/1E2MreeYsa/",
    youtube: "https://www.youtube.com/@imilinstitute",
    tiktok: "https://www.tiktok.com/@imilinstitute",
    email: "mailto:info@imilinstitute.org",
  },
  contact: {
    telephone: "+234 803 490 2904",
    email: "info@imilinstitute.org",
    address:
      "Plot 91, University Village, Cadastral Zone, Nnamdi Azikiwe Expressway, Jabi Abuja Nigeria.",
  },
};

export type SiteConfig = typeof siteConfig;

export function absoluteOgImageUrl(path?: string): string {
  const imagePath = path ?? siteConfig.ogImage;
  const base = siteConfig.url.replace(/\/$/, "");
  if (imagePath.startsWith("http")) return imagePath;
  return `${base}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}
