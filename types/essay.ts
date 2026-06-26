import type { ComponentType } from "react";

export interface EssayPageData {
  title: string;
  description?: string;
  body: ComponentType;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  thumbnail?: string;
  draft?: boolean;
}

export interface EssayPage {
  url: string;
  data: EssayPageData;
}
