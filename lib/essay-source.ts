import { essayDocs, essayMeta } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import type { EssayPage, EssayPageData } from "@/types/essay";

const essaySourceInput = toFumadocsSource(essayDocs, essayMeta);

export const essaySource = loader({
  baseUrl: "/essays",
  source: essaySourceInput,
});

function isPublished(data: EssayPageData): boolean {
  if (!data.draft) return true;
  return process.env.NODE_ENV === "development";
}

export function getAllEssayPages(): EssayPage[] {
  return essaySource.getPages() as unknown as EssayPage[];
}

export function getPublishedEssayPages(): EssayPage[] {
  return getAllEssayPages().filter((page) =>
    isPublished(page.data as EssayPageData),
  );
}

export function getEssayPage(slug: string): EssayPage | undefined {
  return essaySource.getPage([slug]) as EssayPage | undefined;
}

export function getPublishedEssayPage(slug: string): EssayPage | undefined {
  const page = getEssayPage(slug);
  if (!page) return undefined;
  if (!isPublished(page.data as EssayPageData)) return undefined;
  return page;
}
