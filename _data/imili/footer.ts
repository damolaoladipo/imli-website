import { headerNavItems } from "@/_data/imili/header-nav";
import {
  buildSocialLinkList,
  type SocialPlatformId,
} from "@/_data/imili/social-links";
import { siteConfig } from "@/_data/site-config";

export type FooterSocialId = SocialPlatformId;

export type FooterSocialLink = {
  id: FooterSocialId;
  href: string;
};

export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterNavLink[];
};

export type FooterContactLine = {
  type: "email" | "phone";
  value: string;
  href?: string;
};

export type FooterContent = {
  logo: { src: string; alt: string; wordmark: string };
  tagline: string;
  social: FooterSocialLink[];
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  columns: [FooterColumn, FooterColumn, FooterColumn];
  contactLines: FooterContactLine[];
  copyright: string;
  bottomLinks: FooterNavLink[];
};

/** Layout QA — reference strings from footer-reference.png */
export const footerReferenceContent: FooterContent = {
  logo: {
    src: "/blocks/imli-white.svg",
    alt: "IMILI logo",
    wordmark: "Carevia",
  },
  tagline: "Built with care for a better future.",
  social: [
    { id: "facebook", href: "#" },
    { id: "instagram", href: "#" },
    { id: "linkedin", href: "#" },
    { id: "twitter", href: "#" },
    { id: "youtube", href: "#" },
    { id: "tiktok", href: "#" },
  ],
  newsletter: {
    heading: "Stay Connected",
    description:
      "Get stories of impact, program updates, and ways to help — straight to your inbox.",
    placeholder: "Enter Email Address",
    buttonLabel: "Subscribe",
  },
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Who We Are", href: "#" },
        { label: "Our Programs", href: "#" },
        { label: "Get Involved", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookies Settings", href: "#" },
      ],
    },
    { title: "Contact Us", links: [] },
  ],
  contactLines: [
    {
      type: "email",
      value: "hello@carevia.org",
      href: "mailto:hello@carevia.org",
    },
    { type: "phone", value: "+123 456 7890", href: "tel:+1234567890" },
  ],
  copyright: "© Carevia. All rights reserved.",
  bottomLinks: [
    { label: "Style Guide", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Licensing", href: "#" },
  ],
};

function buildContactLines(): FooterContactLine[] {
  const lines: FooterContactLine[] = [];

  if (siteConfig.contact.email) {
    lines.push({
      type: "email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    });
  }

  if (siteConfig.contact.telephone) {
    lines.push({
      type: "phone",
      value: siteConfig.contact.telephone,
      href: `tel:${siteConfig.contact.telephone.replace(/\s/g, "")}`,
    });
  }

  return lines;
}

/** IMILI production footer */
export const footerHomepageContent: FooterContent = {
  logo: {
    src: "/blocks/imli-white.svg",
    alt: "IMILI logo",
    wordmark: siteConfig.name,
  },
  tagline: '',
  social: buildSocialLinkList<FooterSocialLink>(),
  newsletter: {
    heading: "TBD",
    description: 'Newsletter',
    placeholder: "Enter email address",
    buttonLabel: "Subscribe",
  },
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "/" },
        ...headerNavItems.map(({ name, href }) => ({ label: name, href })),
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "TBD" },
        { label: "Terms of Service", href: "TBD" },
        { label: "Cookies Settings", href: "TBD" },
      ],
    },
    { title: "Contact Us", links: [] },
  ],
  contactLines: buildContactLines(),
  copyright: `© ${new Date().getFullYear()} ${siteConfig.fullName}. All rights reserved.`,
  bottomLinks: [],
};
