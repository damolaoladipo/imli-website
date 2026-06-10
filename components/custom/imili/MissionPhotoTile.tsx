import Image from "next/image";
import { cn } from "@/lib/utils";

type MissionPhotoTileProps = {
  src: string;
  alt: string;
  showSwirl?: boolean;
  className?: string;
};

function MissionSwirlOverlay() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M -20 220 Q 40 180 80 200 T 160 140"
        stroke="#2EBC5E"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MissionPhotoTile({
  src,
  alt,
  showSwirl = false,
  className,
}: MissionPhotoTileProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[25px]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 50vw, 280px"
      />
      {showSwirl ? <MissionSwirlOverlay /> : null}
    </div>
  );
}
