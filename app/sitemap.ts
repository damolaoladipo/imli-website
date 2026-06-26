import type { MetadataRoute } from "next";
import { siteConfig } from "@/_data/site-config";
import { getPublishedEssayPages } from "@/lib/essay-source";
import { getPublishedNewsPages } from "@/lib/news-source";
import { getPublishedProjectPages } from "@/lib/project-source";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const essays = getPublishedEssayPages().map((page) => ({
    url: `${base}${page.url}`,
    lastModified: new Date(page.data.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const news = getPublishedNewsPages().map((page) => ({
    url: `${base}${page.url}`,
    lastModified: new Date(page.data.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projects = getPublishedProjectPages().map((page) => ({
    url: `${base}${page.url}`,
    lastModified: new Date(page.data.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/essays`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.8 },
    ...essays,
    ...news,
    ...projects,
  ];
}
