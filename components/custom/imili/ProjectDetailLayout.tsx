import Image from "next/image";
import type { ProjectData } from "@/types/project";
import { ProjectStatusLabel } from "./ProjectStatusLabel";
import { ProjectSubmissionSidebar } from "./ProjectSubmissionSidebar";

type ProjectDetailLayoutProps = {
  data: ProjectData;
  children: React.ReactNode;
};

export function ProjectDetailLayout({
  data,
  children,
}: ProjectDetailLayoutProps) {
  return (
    <article className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-8">
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt}
              width={1600}
              height={969}
              className="h-auto w-full rounded-sm"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            <ProjectStatusLabel status={data.status} className="mt-6" />

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {data.title}
            </h1>

            {data.subtitle && (
              <p className="mt-2 text-xl text-muted-foreground">
                {data.subtitle}
              </p>
            )}

            <div className="prose-imili mt-8">
              {children}
            </div>
          </div>

          <aside className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <ProjectSubmissionSidebar data={data} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
