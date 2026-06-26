import { newsDocs, newsMeta } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import type { NewsArticleData, NewsPage } from "@/types/news";

const newsSourceInput = toFumadocsSource(newsDocs, newsMeta);

export const newsSource = loader({
  baseUrl: "/news",
  source: newsSourceInput,
});

function isPublished(data: NewsArticleData): boolean {
  if (!data.draft) return true;
  return process.env.NODE_ENV === "development";
}

export function getAllNewsPages(): NewsPage[] {
  return newsSource.getPages() as unknown as NewsPage[];
}

export function getPublishedNewsPages(): NewsPage[] {
  return getAllNewsPages().filter((page) =>
    isPublished(page.data as NewsArticleData),
  );
}

export function getNewsPage(slug: string): NewsPage | undefined {
  return newsSource.getPage([slug]) as NewsPage | undefined;
}

export function getPublishedNewsPage(slug: string): NewsPage | undefined {
  const page = getNewsPage(slug);
  if (!page) return undefined;
  if (!isPublished(page.data as NewsArticleData)) return undefined;
  return page;
}
