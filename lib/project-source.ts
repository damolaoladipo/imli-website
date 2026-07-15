import { projectDocs, projectMeta } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import type { ProjectData, ProjectPage } from "@/types/project";

const projectSourceInput = toFumadocsSource(projectDocs, projectMeta);

export const projectsSource = loader({
  baseUrl: "/projects",
  source: projectSourceInput,
});

function isPublished(data: ProjectData): boolean {
  if (!data.draft) return true;
  return process.env.NODE_ENV === "development";
}

function compareProjects(a: ProjectPage, b: ProjectPage): number {
  const aData = a.data as ProjectData;
  const bData = b.data as ProjectData;
  const orderA = aData.sortOrder ?? Number.MAX_SAFE_INTEGER;
  const orderB = bData.sortOrder ?? Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) return orderA - orderB;
  return new Date(bData.date).getTime() - new Date(aData.date).getTime();
}

export function getProjectSlugSegments(page: ProjectPage): string[] {
  return page.url.replace(/^\/projects\//, "").split("/").filter(Boolean);
}

export function getAllProjectPages(): ProjectPage[] {
  return projectsSource.getPages() as unknown as ProjectPage[];
}

export function getPublishedProjectPages(): ProjectPage[] {
  return getAllProjectPages()
    .filter((page) => isPublished(page.data as ProjectData))
    .filter((page) => (page.data as ProjectData).listOnProjectsIndex !== false)
    .sort(compareProjects);
}

export function getProjectPage(slug: string[]): ProjectPage | undefined {
  return projectsSource.getPage(slug) as ProjectPage | undefined;
}

export function getPublishedProjectPage(slug: string[]): ProjectPage | undefined {
  const page = getProjectPage(slug);
  if (!page) return undefined;
  if (!isPublished(page.data as ProjectData)) return undefined;
  return page;
}

export function getAfaxPStorytellingPage(): ProjectPage | undefined {
  return getPublishedProjectPage([
    "Afax-p",
    "digital-storytelling-for-peace-building",
  ]);
}
