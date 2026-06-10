"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import React from "react";

import { headerNavItems } from "@/_data/imili/header-nav";
import { CustomButton } from "@/components/custom/custom-button";
import { HeaderMegaMenuPanel } from "@/components/custom/header-mega-menu-panel";
import Logo from "@/components/custom/logo";
import { MobileNavDrawer } from "@/components/custom/mobile-nav-drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
            <div className="flex w-full justify-between gap-6 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuState((open) => !open)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                aria-expanded={menuState}
                aria-controls="mobile-nav-drawer"
                className="relative z-20 block min-h-11 min-w-11 cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="m-auto hidden size-fit lg:block">
                <NavigationMenu viewport={false}>
                  <NavigationMenuList className="gap-1">
                    {headerNavItems.map((item) => (
                      <NavigationMenuItem key={item.name}>
                        {item.dropdown ? (
                          <>
                            <NavigationMenuTrigger
                              className={cn(
                                "h-auto px-4 py-2 text-lg font-medium text-black transition-colors duration-150 lg:text-xl",
                                "hover:!bg-transparent hover:!text-[#0548bd] focus:!bg-transparent",
                                "data-[state=open]:!bg-transparent data-[state=open]:!text-[#0548bd] data-[state=open]:hover:!text-[#0548bd]",
                                "[&_svg]:text-black hover:[&_svg]:text-[#0548bd] data-[state=open]:[&_svg]:text-[#0548bd]",
                              )}
                            >
                              {item.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="!rounded-2xl !border-0 !bg-transparent !p-0 !text-neutral-900 !shadow-none">
                              <HeaderMegaMenuPanel dropdown={item.dropdown} />
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="inline-flex h-auto items-center justify-center rounded-md px-4 py-2 text-lg font-medium text-black transition-colors duration-150 hover:!bg-transparent hover:!text-[#0548bd] focus:!bg-transparent lg:text-xl"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            <div className="hidden w-fit items-center gap-6 lg:flex">
              <CustomButton
                href="/contact"
                className={cn(isScrolled && "hidden")}
              >
                Contact us
              </CustomButton>

              <CustomButton
                href="/contact"
                className={cn(isScrolled ? "inline-flex" : "hidden")}
              >
                Contact us
              </CustomButton>
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
