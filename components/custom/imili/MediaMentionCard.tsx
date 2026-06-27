import Image from "next/image";
import Link from "next/link";
import type { MediaMention } from "@/types/news";

export function MediaMentionCard({ mention }: { mention: MediaMention }) {
  return (
    <Link
      href={mention.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 border-b border-border py-6 first:pt-0"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-muted">
        <Image
          src={mention.imageSrc}
          alt={mention.imageAlt}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {mention.outlet}
        </p>
        <h3 className="mt-1 text-base font-bold leading-snug text-foreground group-hover:text-primary">
          {mention.headline}
        </h3>
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          {mention.excerpt}
        </p>
      </div>
    </Link>
  );
}
