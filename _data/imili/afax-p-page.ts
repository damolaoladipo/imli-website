import { getPublishedProjectPage } from "@/lib/project-source";
import type { ProjectData, ProjectPage } from "@/types/project";

export type AfaxPHubItem = {
  href: string;
  project: ProjectPage;
};

const AFAX_P_HUB_ENTRIES = [
  {
    slug: ["Afax-p", "digital-storytelling-for-peace-building"] as const,
    href: "/afax-p/digital-storytelling-for-peace-building",
  },
  {
    slug: ["Afax-p", "africa-against-xenophobia-project"] as const,
    href: "/projects/Afax-p/africa-against-xenophobia-project",
  },
] as const;

export function getAfaxPHubItems(): AfaxPHubItem[] {
  return AFAX_P_HUB_ENTRIES.flatMap((entry) => {
    const project = getPublishedProjectPage([...entry.slug]);
    if (!project) return [];
    return [{ href: entry.href, project }];
  });
}

export const afaxPHubIntro = {
  title: "Africa Against Xenophobia Project (AfAX-P)",
  description:
    "IMILI's flagship initiative to counter misinformation-driven xenophobia and hate, strengthen social cohesion, and advance peace across Africa.",
};

export function getAfaxPHubItemData(project: ProjectPage): ProjectData {
  return project.data as ProjectData;
}
