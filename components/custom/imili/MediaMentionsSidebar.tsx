import { getMediaMentionsForArticle } from "@/_data/imili/media-mentions";
import { MediaMentionCard } from "./MediaMentionCard";

export function MediaMentionsSidebar({ slug }: { slug: string }) {
  const mentions = getMediaMentionsForArticle(slug);

  return (
    <section aria-labelledby="media-mentions-heading">
      <h2
        id="media-mentions-heading"
        className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
      >
        Latest Media Mentions
      </h2>
      <div className="mt-4">
        {mentions.map((mention) => (
          <MediaMentionCard key={mention.id} mention={mention} />
        ))}
      </div>
    </section>
  );
}
