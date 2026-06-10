"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import React from "react";

import { headerNavItems } from "@/_data/imili/header-nav";
import { CustomButton } from "@/components/custom/custom-button";
import { HeaderMegaMenuLink } from "@/components/custom/header-mega-menu-link";
import { HeaderMegaMenuPanel } from "@/components/custom/header-mega-menu-panel";
import Logo from "@/components/custom/logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

function MobileNavLinks({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <ul className="space-y-6 text-xl">
      {headerNavItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="font-medium text-black transition-colors duration-150 hover:text-[#0548bd] block"
          >
            {item.name}
          </Link>
          {item.dropdown && (
            <ul className="mt-4 space-y-3 pl-0">
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
          )}
        </li>
      ))}
    </ul>
  );
}

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
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

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <MobileNavLinks onNavigate={() => setMenuState(false)} />
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <CustomButton
                  href="/contact"
                  className={cn(isScrolled && "hidden")}
                >
                  Contact us
                </CustomButton>

                <CustomButton
                  href="/contact"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  Contact us
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
