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
  const content = (
    <div
      className={cn(
        "group flex items-start gap-4 rounded-lg transition-colors duration-150",
        variant === "panel" && "-mx-2 p-2 hover:bg-neutral-50",
        variant === "mobile" && "gap-3",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[10px] border border-neutral-200 bg-neutral-50 transition-colors duration-150 group-hover:border-[#0548bd] group-hover:bg-[#0548bd]/5",
          variant === "panel" ? "size-11" : "size-9",
        )}
      >
        <Icon
          className={cn(
            "text-neutral-900 transition-colors duration-150 group-hover:text-[#0548bd]",
            variant === "panel" ? "size-5" : "size-4",
          )}
          aria-hidden
        />
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "font-semibold text-neutral-900 transition-colors duration-150 group-hover:text-[#0548bd]",
            variant === "panel" ? "text-base leading-6" : "text-sm leading-5",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "text-neutral-600 transition-colors duration-150 group-hover:text-[#0548bd]",
            variant === "panel"
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
        className="block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className="block">
      {content}
    </Link>
  );
}
