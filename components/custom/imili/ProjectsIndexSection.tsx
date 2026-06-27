import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { getPublishedProjectPages } from "@/lib/project-source";
import type { ProjectData } from "@/types/project";
import { ProjectStatusLabel } from "./ProjectStatusLabel";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function ProjectsIndexSection() {
  const projects = [...getPublishedProjectPages()].sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            Institute programmes, research initiatives, and calls for papers
            across Africa.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-body-muted">
            No projects published yet.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {projects.map((project) => {
              const data = project.data as ProjectData;
              return (
                <Link
                  key={project.url}
                  href={project.url}
                  className="group flex flex-col gap-6 border-b border-border pb-8 sm:flex-row"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-sm bg-muted/30 sm:w-72">
                    <Image
                      src={data.heroImage}
                      alt={data.heroImageAlt}
                      fill
                      className="object-contain transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 18rem"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <ProjectStatusLabel status={data.status} />
                    <div className="flex items-center gap-2 text-base text-muted-foreground md:text-lg">
                      <Calendar className="h-4 w-4" aria-hidden />
                      <time>{formatDate(data.date)}</time>
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary md:text-2xl">
                      {data.acronym ? `${data.acronym} — ${data.title}` : data.title}
                    </h2>
                    {data.description && (
                      <p className="line-clamp-3 text-body-muted">
                        {data.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
