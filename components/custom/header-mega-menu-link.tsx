import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type HeaderMegaMenuLinkProps = {
  label: string;
  description: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
  variant?: "panel" | "mobile";
  onNavigate?: () => void;
};

export function HeaderMegaMenuLink({
  label,
  description,
  href,
  external,
  icon: Icon,
  variant = "panel",
  onNavigate,
}: HeaderMegaMenuLinkProps) {
  const isPanel = variant === "panel";

  const linkClassName = cn(
    "block transition-colors duration-150",
    isPanel && "text-black hover:text-[#0548bd]",
  );

  const content = (
    <div
      className={cn(
        "group/link flex items-start gap-4 rounded-lg transition-colors duration-150",
        isPanel && "-mx-2 p-2 hover:bg-neutral-50",
        variant === "mobile" && "gap-3",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[10px] border border-neutral-200 bg-neutral-50 transition-colors duration-150 group-hover/link:border-[#0548bd] group-hover/link:bg-[#0548bd]/5",
          isPanel ? "size-11" : "size-9",
        )}
      >
        <Icon
          className={cn(
            "transition-colors duration-150",
            isPanel
              ? "text-current"
              : "text-black group-hover/link:text-[#0548bd]",
            isPanel ? "size-5" : "size-4",
          )}
          aria-hidden
        />
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "font-semibold transition-colors duration-150",
            isPanel
              ? "text-current"
              : "text-black group-hover/link:text-[#0548bd]",
            isPanel ? "text-base leading-6" : "text-sm leading-5",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "transition-colors duration-150",
            isPanel
              ? "text-current"
              : "text-neutral-600 group-hover/link:text-[#0548bd]",
            isPanel
              ? "mt-0.5 text-sm leading-snug"
              : "mt-0.5 text-xs leading-snug",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={linkClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={linkClassName}>
      {content}
    </Link>
  );
}
