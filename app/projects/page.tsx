import type { Metadata } from "next";
import { siteConfig } from "@/_data/site-config";
import { ProjectsIndexSection } from "@/components/custom/imili/ProjectsIndexSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "IMILI research initiatives, programmes, and calls for papers across Africa.",
  openGraph: {
    url: `${siteConfig.url}/projects`,
    title: `Projects — ${siteConfig.name}`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndexSection />;
}
