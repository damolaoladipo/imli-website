"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { headerNavItems } from "@/_data/imili/header-nav";
import { HeaderMegaMenuPanel } from "@/components/custom/header-mega-menu-panel";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navTriggerClass =
  "h-auto px-4 py-2 text-lg font-medium text-black transition-colors duration-150 lg:text-xl";

const navLinkClass =
  "inline-flex h-auto items-center justify-center rounded-md px-4 py-2 text-lg font-medium text-black transition-colors duration-150 hover:!bg-transparent hover:!text-[#0548bd] focus:!bg-transparent lg:text-xl";

const dropdownContentClass =
  "!left-0 !rounded-2xl !border-0 !bg-transparent !p-0 !text-neutral-900 !shadow-none [&_a]:!text-black [&_a:hover]:!text-[#0548bd]";

function useNavActive() {
  const pathname = usePathname();

  const isNavActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeNavClass = (href: string, base: string) =>
    cn(base, isNavActive(href) && "!text-[#0548bd] font-semibold");

  return { isNavActive, activeNavClass };
}

function HeaderDesktopNavFallback() {
  const { activeNavClass } = useNavActive();

  return (
    <ul className="flex list-none flex-wrap items-center gap-1">
      {headerNavItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={activeNavClass(item.href, navLinkClass)}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HeaderDesktopNavMenu() {
  const { isNavActive, activeNavClass } = useNavActive();

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-1">
        {headerNavItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            {item.dropdown ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    navTriggerClass,
                    "hover:!bg-transparent hover:!text-[#0548bd] focus:!bg-transparent",
                    "data-[state=open]:!bg-transparent data-[state=open]:!text-[#0548bd] data-[state=open]:hover:!text-[#0548bd]",
                    "[&_svg]:text-black hover:[&_svg]:text-[#0548bd] data-[state=open]:[&_svg]:text-[#0548bd]",
                    isNavActive(item.href) && "!text-[#0548bd] font-semibold",
                  )}
                >
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className={dropdownContentClass}>
                  <HeaderMegaMenuPanel dropdown={item.dropdown} />
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={activeNavClass(item.href, navLinkClass)}
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function HeaderDesktopNav() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeaderDesktopNavFallback />;
  }

  return <HeaderDesktopNavMenu />;
}
