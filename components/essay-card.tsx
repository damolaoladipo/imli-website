import Link from "next/link";
import Image from "next/image";

interface EssayCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  readTime?: string;
}

export function EssayCard({
  url,
  title,
  description,
  date,
  thumbnail,
  readTime,
}: EssayCardProps) {
  return (
    <Link
      href={url}
      className="group flex flex-col gap-5 border-b border-border py-6 transition-colors sm:flex-row sm:items-start sm:gap-6 md:gap-8"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground md:text-base">{date}</p>
          <h3 className="text-base font-semibold leading-snug text-foreground underline-offset-4 group-hover:underline md:text-lg">
            {title}
          </h3>
          <p className="line-clamp-2 text-lg leading-relaxed text-muted-foreground md:line-clamp-3 md:text-xl">
            {description}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex items-center border border-border bg-background px-3 py-1 text-xs font-medium transition-colors group-hover:bg-muted">
            Read essay
          </span>
          {readTime && (
            <span className="text-xs text-muted-foreground">{readTime}</span>
          )}
        </div>
      </div>
      {thumbnail && (
        <div className="w-full shrink-0 overflow-hidden rounded-xs bg-muted sm:w-52 md:w-64">
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={600}
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 13rem, 16rem"
          />
        </div>
      )}
    </Link>
  );
}
