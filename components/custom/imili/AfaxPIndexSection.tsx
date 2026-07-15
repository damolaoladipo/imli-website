import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import {
  afaxPHubIntro,
  getAfaxPHubItemData,
  getAfaxPHubItems,
} from "@/_data/imili/afax-p-page";
import { ProjectStatusLabel } from "./ProjectStatusLabel";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function AfaxPIndexSection() {
  const items = getAfaxPHubItems();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {afaxPHubIntro.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {afaxPHubIntro.description}
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-muted-foreground">
            No AFAX-P programmes published yet.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {items.map(({ href, project }) => {
              const data = getAfaxPHubItemData(project);
              return (
                <Link
                  key={href}
                  href={href}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden />
                      <time>{formatDate(data.date)}</time>
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary md:text-2xl">
                      {data.acronym
                        ? `${data.acronym} — ${data.title}`
                        : data.title}
                    </h2>
                    {data.description && (
                      <p className="line-clamp-3 text-muted-foreground">
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
