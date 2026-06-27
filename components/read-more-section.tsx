import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPublishedEssayPages } from "@/lib/essay-source";
import { siteConfig } from "@/_data/site-config";
import type { EssayPage } from "@/types/essay";

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

interface ReadMoreSectionProps {
  currentSlug: string;
  currentTags?: string[];
}

export function ReadMoreSection({
  currentSlug,
  currentTags = [],
}: ReadMoreSectionProps) {
  const allPages = getPublishedEssayPages();
  const currentUrl = `/essays/${currentSlug}`;

  const otherPosts = allPages
    .filter((page) => page.url !== currentUrl)
    .map((page) => {
      const tagOverlap = currentTags.filter((tag) =>
        page.data.tags?.includes(tag),
      ).length;
      return {
        ...page,
        relevanceScore: tagOverlap,
        date: new Date(page.data.date),
      };
    })
    .sort((a, b) => {
      if (a.relevanceScore !== b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return b.date.getTime() - a.date.getTime();
    })
    .slice(0, 3);

  if (otherPosts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">More essays</h2>
        <Link
          href={siteConfig.baseLinks.essays}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post: EssayPage & { date: Date }) => {
          const tag = post.data.tags?.[0] ?? "";
          return (
            <Link
              key={post.url}
              href={post.url}
              className="group flex flex-col gap-3"
            >
              {post.data.thumbnail && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={post.data.thumbnail}
                    alt={post.data.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <p className="text-base text-muted-foreground md:text-lg">
                  {tag && <>{tag} · </>}
                  {formatDate(post.date)}
                </p>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                  {post.data.title}
                </h3>
                {post.data.description && (
                  <p className="line-clamp-2 text-base text-muted-foreground md:text-lg">
                    {post.data.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
