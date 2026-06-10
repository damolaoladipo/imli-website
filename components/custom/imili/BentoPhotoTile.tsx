import Image from "next/image";
import { cn } from "@/lib/utils";

type BentoPhotoTileProps = {
  src: string;
  alt: string;
  className?: string;
};

export function BentoPhotoTile({ src, alt, className }: BentoPhotoTileProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[25px]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1440px) 30vw, 400px"
      />
    </div>
  );
}
