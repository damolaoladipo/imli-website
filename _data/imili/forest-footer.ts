import { siteConfig } from "@/_data/site-config";
import { headerNavItems } from "@/_data/imili/header-nav";

export type ForestFooterNavLink = {
  label: string;
  href: string;
  underlined?: boolean;
};

export type ForestFooterSocialId = "facebook" | "instagram" | "youtube";

export type ForestFooterSocialLink = {
  id: ForestFooterSocialId;
  href: string;
};

export type ForestFooterContent = {
  background: { src: string; alt: string };
  logo: { src: string; alt: string };
  newsletter: {
    headlineBefore: string;
    headlineEmphasis: string;
    headlineAfter: string;
    subtext: string;
    placeholder: string;
    buttonLabel: string;
  };
  attribution: string;
  pages: {
    title: string;
    columns: [ForestFooterNavLink[], ForestFooterNavLink[]];
  };
  address: {
    title: string;
    blocks: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
  };
  social: {
    title: string;
    links: ForestFooterSocialLink[];
  };
};

/** Layout QA — reference strings from forest-footer-reference.png */
export const forestFooterReferenceContent: ForestFooterContent = {
  background: {
    src: "/new/vision.png",
    alt: "Placeholder — forest footer background QA",
  },
  logo: {
    src: "/blocks/imli-logo.svg",
    alt: "IMILI logo",
  },
  newsletter: {
    headlineBefore: "We believe ",
    headlineEmphasis: "real change",
    headlineAfter: " starts deep within the supply chain.",
    subtext: "Join our eco-supply community.",
    placeholder: "Type your email",
    buttonLabel: "Subscribe",
  },
  attribution: "Designed by Webestica, Powered by Framer",
  pages: {
    title: "Pages",
    columns: [
      [
        { label: "Home", href: "/", underlined: true },
        { label: "Home 2", href: "#" },
        { label: "About", href: "/about" },
        { label: "Service Static", href: "#" },
        { label: "Case Studies", href: "#" },
      ],
      [
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "#" },
        { label: "Privacy policy", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    ],
  },
  address: {
    title: "Address",
    blocks: [
      "123 Remote Work Avenue, San Francisco, CA 94105",
      "144 Creative Street, Suite 456, New York, NY 10001, USA",
    ],
  },
  contact: {
    title: "Contact",
    email: "hello@yourbrand.com",
    phone: "+1 202 555 0147",
  },
  social: {
    title: "Social media",
    links: [
      { id: "facebook", href: "#" },
      { id: "instagram", href: "#" },
      { id: "youtube", href: "#" },
    ],
  },
};

function splitNavIntoColumns(): [ForestFooterNavLink[], ForestFooterNavLink[]] {
  const links: ForestFooterNavLink[] = [
    { label: "Home", href: "/" },
    ...headerNavItems.map(({ name, href }) => ({ label: name, href })),
  ];
  const mid = Math.ceil(links.length / 2);
  return [links.slice(0, mid), links.slice(mid)];
}

function buildSocialLinks(): ForestFooterSocialLink[] {
  const ids: ForestFooterSocialId[] = ["facebook", "instagram", "youtube"];
  return ids
    .map((id) => ({ id, href: siteConfig.links[id] }))
    .filter((link) => link.href.length > 0);
}

/** IMILI production forest footer */
export const forestFooterHomepageContent: ForestFooterContent = {
  background: {
    src: "/new/vision.png",
    alt: "IMILI footer background",
  },
  logo: { src: "/blocks/imli-logo.svg", alt: "IMILI logo" },
  newsletter: {
    headlineBefore: "We believe ",
    headlineEmphasis: "informed citizens",
    headlineAfter: " build peaceful societies.",
    subtext: "Join the IMILI community today.",
    placeholder: "Type your email",
    buttonLabel: "Subscribe",
  },
  attribution:
    "© 2026. International Media and Information Literacy Institute (IMILI) (All Rights Reserved.",
  pages: { title: "Pages", columns: splitNavIntoColumns() },
  address: {
    title: "Address",
    blocks: siteConfig.contact.address ? [siteConfig.contact.address] : [],
  },
  contact: {
    title: "Contact",
    email: siteConfig.contact.email,
    phone: siteConfig.contact.telephone,
  },
  social: {
    title: "Social media",
    links:
      buildSocialLinks().length > 0
        ? buildSocialLinks()
        : [
            { id: "facebook", href: "#" },
            { id: "instagram", href: "#" },
            { id: "youtube", href: "#" },
          ],
  },
};
