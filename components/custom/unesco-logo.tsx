import Image from "next/image";
import Link from "next/link";

import { mobileHeaderLogoClass } from "@/components/custom/logo";
import { cn } from "@/lib/utils";

type UnescoLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function UnescoLogo({ className, imageClassName }: UnescoLogoProps) {
  return (
    <Link
      href="https://www.unesco.org/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="UNESCO"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/blocks/unesco.svg"
        alt="UNESCO logo"
        width={384}
        height={384}
        className={cn(mobileHeaderLogoClass, "lg:h-24", imageClassName)}
      />
    </Link>
  );
}
