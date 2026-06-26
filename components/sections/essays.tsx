import { Suspense } from "react";
import { EssayCard } from "@/components/essay-card";
import { TagFilter } from "@/components/tag-filter";
import { getPublishedEssayPages } from "@/lib/essay-source";
import type { EssayPage } from "@/types/essay";

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function Essays({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const allPages = getPublishedEssayPages();
  const sortedEssays = [...allPages].sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedEssays.flatMap((essay) => essay.data.tags || [])),
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredEssays =
    selectedTag === "All"
      ? sortedEssays
      : sortedEssays.filter((essay) =>
          essay.data.tags?.includes(selectedTag),
        );

  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === "All") acc[tag] = sortedEssays.length;
      else
        acc[tag] = sortedEssays.filter((e) =>
          e.data.tags?.includes(tag),
        ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-3xl px-6 py-24 md:py-36">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Essays
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Research, explainers, and institute perspectives on media and
              information literacy — written for educators, policymakers, and
              partners worldwide.
            </p>
          </div>

          {sortedEssays.length > 1 && allTags.length > 1 && (
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          )}

          <Suspense
            fallback={
              <div className="text-sm text-muted-foreground">
                Loading essays...
              </div>
            }
          >
            {filteredEssays.length === 0 ? (
              <p className="text-muted-foreground">
                {sortedEssays.length === 0
                  ? "No essays published yet."
                  : "No essays in this category."}
              </p>
            ) : (
              <div className="flex flex-col">
                {filteredEssays.map((essay: EssayPage) => (
                  <EssayCard
                    key={essay.url}
                    url={essay.url}
                    title={essay.data.title}
                    description={essay.data.description ?? ""}
                    date={formatDate(new Date(essay.data.date))}
                    thumbnail={essay.data.thumbnail}
                    readTime={essay.data.readTime}
                  />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
