import type { ComponentType } from "react";

export type ProjectStatus = "call-for-papers" | "active" | "completed";

export interface ProjectData {
  title: string;
  description?: string;
  subtitle?: string;
  acronym?: string;
  status: ProjectStatus;
  date: string;
  heroImage: string;
  heroImageAlt: string;
  abstractDeadline?: string;
  firstDraftDeadline?: string;
  submissionEmail?: string;
  submissionEmailSubject?: string;
  abstractWordLimit?: number;
  draft?: boolean;
  body: ComponentType;
}

export interface ProjectPage {
  url: string;
  data: ProjectData;
}
