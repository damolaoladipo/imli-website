"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import React from "react";

import { HeaderDesktopNav } from "@/components/custom/header-desktop-nav";
import Logo from "@/components/custom/logo";
import { MobileNavDrawer } from "@/components/custom/mobile-nav-drawer";
import { UnescoLogo } from "@/components/custom/unesco-logo";
import { cn } from "@/lib/utils";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = React.useCallback(() => {
    setMenuState(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        data-state={menuState && "active"}
        className={cn(
          "w-full border-b border-black/5 bg-white/90 backdrop-blur-md transition-all duration-300",
          isScrolled && "bg-white/95 shadow-sm",
        )}
      >
        <div className="mx-auto max-w-8xl px-6">
          <div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-6 transition-all duration-200 lg:gap-0",
              isScrolled && "py-3",
            )}
          >
            <div className="flex w-full items-center justify-between gap-6 lg:w-auto lg:justify-start">
              <div className="hidden items-center gap-6 lg:flex">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex shrink-0 items-center space-x-2"
                >
                  <Logo />
                </Link>

                <HeaderDesktopNav />
              </div>

              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 lg:hidden"
              >
                <Logo />
              </Link>

              <div className="flex items-center gap-2 lg:hidden">
                <UnescoLogo />
                <button
                  ref={menuButtonRef}
                  type="button"
                  onClick={() => setMenuState((open) => !open)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  aria-expanded={menuState}
                  aria-controls="mobile-nav-drawer"
                  className="relative z-20 block min-h-11 min-w-11 cursor-pointer p-2.5"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>
            </div>

            <div className="hidden w-fit items-center lg:flex">
              <UnescoLogo />
            </div>
          </div>
        </div>
      </nav>

      <MobileNavDrawer
        open={menuState}
        onClose={closeMenu}
        menuButtonRef={menuButtonRef}
      />
    </header>
  );
};
