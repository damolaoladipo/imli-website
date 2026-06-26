import type { ComponentType } from "react";

export interface NewsArticleData {
  title: string;
  description?: string;
  date: string;
  heroImage: string;
  heroImageAlt: string;
  category?: string;
  externalSourceUrl?: string;
  externalSourceLabel?: string;
  draft?: boolean;
  body: ComponentType;
}

export interface NewsPage {
  url: string;
  data: NewsArticleData;
}

export type MediaMention = {
  id: string;
  outlet: string;
  outletLogoSrc?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  excerpt: string;
};
