import { siteConfig } from "@/_data/site-config";

export const SOCIAL_PLATFORM_ORDER = [
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "tiktok",
] as const;

export type SocialPlatformId = (typeof SOCIAL_PLATFORM_ORDER)[number];

export const SOCIAL_ARIA_LABELS: Record<SocialPlatformId, string> = {
  facebook: "IMILI on Facebook",
  instagram: "IMILI on Instagram",
  linkedin: "IMILI on LinkedIn",
  twitter: "IMILI on X",
  youtube: "IMILI on YouTube",
  tiktok: "IMILI on TikTok",
};

export function getSocialHref(id: SocialPlatformId): string {
  return siteConfig.links[id];
}

export function buildSocialLinkList<
  T extends { id: SocialPlatformId; href: string },
>(): T[] {
  return SOCIAL_PLATFORM_ORDER.map((id) => ({
    id,
    href: getSocialHref(id),
  })).filter((link) => link.href.length > 0) as T[];
}
