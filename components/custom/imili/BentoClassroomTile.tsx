import Image from "next/image";
import { cn } from "@/lib/utils";

type BentoClassroomTileProps = {
  src: string;
  alt: string;
  overlayLabel: string;
  className?: string;
};

export function BentoClassroomTile({
  src,
  alt,
  overlayLabel,
  className,
}: BentoClassroomTileProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[25px]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1440px) 35vw, 450px"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-10">
        <p className="text-[18px] text-white">{overlayLabel}</p>
      </div>
    </div>
  );
}
