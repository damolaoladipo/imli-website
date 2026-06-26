"use client";

import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import React from "react";

import { headerNavItems } from "@/_data/imili/header-nav";
import { CustomButton } from "@/components/custom/custom-button";
import { HeaderMegaMenuLink } from "@/components/custom/header-mega-menu-link";
import Logo from "@/components/custom/logo";
import { UnescoLogo } from "@/components/custom/unesco-logo";
import { cn } from "@/lib/utils";

function slugifyNavName(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
}

type MobileNavAccordionProps = {
  onNavigate: () => void;
  resetKey: number;
};

function MobileNavAccordion({ onNavigate, resetKey }: MobileNavAccordionProps) {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    setOpenSection(null);
  }, [resetKey]);

  return (
    <nav aria-label="Mobile navigation links" className="w-full">
      {headerNavItems.map((item) => {
        if (item.dropdown) {
          const sectionId = slugifyNavName(item.name);
          const panelId = `mobile-nav-panel-${sectionId}`;
          const triggerId = `mobile-nav-trigger-${sectionId}`;
          const isOpen = openSection === item.name;

          return (
            <div
              key={item.name}
              className="border-b border-neutral-100 last:border-b-0"
            >
              <button
                id={triggerId}
                type="button"
                className={cn(
                  "flex min-h-11 w-full items-center justify-between py-3 text-left text-xl font-medium transition-colors duration-150",
                  isOpen ? "text-[#0548bd]" : "text-black",
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenSection((current) =>
                    current === item.name ? null : item.name,
                  )
                }
              >
                {item.name}
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180 text-[#0548bd]" : "text-black",
                  )}
                  aria-hidden
                />
              </button>
              {isOpen ? (
                <ul
                  id={panelId}
                  role="list"
                  aria-labelledby={triggerId}
                  className="mt-2 space-y-2 pb-4"
                >
                  {item.dropdown.links.map((link) => (
                    <li key={link.href}>
                      <HeaderMegaMenuLink
                        label={link.label}
                        description={link.description}
                        href={link.href}
                        external={link.external}
                        icon={link.icon}
                        variant="mobile"
                        onNavigate={onNavigate}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className="flex min-h-11 items-center border-b border-neutral-100 text-xl font-medium text-black transition-colors duration-150 last:border-b-0 hover:text-[#0548bd]"
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export function MobileNavDrawer({
  open,
  onClose,
  menuButtonRef,
}: MobileNavDrawerProps) {
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (!open) {
      setResetKey((key) => key + 1);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    if (drawer) {
      const focusable = getFocusableElements(drawer);
      focusable[0]?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = getFocusableElements(drawerRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [open, onClose, menuButtonRef]);

  if (!open) return null;

  return (
    <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={cn(
          "fixed inset-0 z-[60] flex h-dvh w-full flex-col bg-white lg:hidden",
          !reduceMotion && "animate-in fade-in duration-200",
        )}
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-6 py-6"
          style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
        >
          <Link
            href="/"
            aria-label="Home"
            onClick={onClose}
            className="inline-flex items-center"
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <UnescoLogo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center p-2.5 text-black transition-colors hover:text-[#0548bd]"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <MobileNavAccordion onNavigate={onClose} resetKey={resetKey} />
        </div>

        <div className="shrink-0 border-t border-neutral-200 p-6">
          <CustomButton href="/contact" fullWidth onClick={onClose}>
            Contact us
          </CustomButton>
        </div>
      </div>
  );
}
