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

export function getAllProjectPages(): ProjectPage[] {
  return projectsSource.getPages() as unknown as ProjectPage[];
}

export function getPublishedProjectPages(): ProjectPage[] {
  return getAllProjectPages().filter((page) =>
    isPublished(page.data as ProjectData),
  );
}

export function getProjectPage(slug: string): ProjectPage | undefined {
  return projectsSource.getPage([slug]) as ProjectPage | undefined;
}

export function getPublishedProjectPage(slug: string): ProjectPage | undefined {
  const page = getProjectPage(slug);
  if (!page) return undefined;
  if (!isPublished(page.data as ProjectData)) return undefined;
  return page;
}
