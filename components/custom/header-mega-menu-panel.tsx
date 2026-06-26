import Image from "next/image";

import type { HeaderNavDropdown } from "@/_data/imili/header-nav";
import { HeaderMegaMenuLink } from "@/components/custom/header-mega-menu-link";

type HeaderMegaMenuPanelProps = {
  dropdown: HeaderNavDropdown;
};

export function HeaderMegaMenuPanel({ dropdown }: HeaderMegaMenuPanelProps) {
  return (
    <div className="flex w-[min(920px,calc(100vw-3rem))] max-w-full flex-col gap-6 rounded-2xl bg-white p-6 text-black shadow-[0_20px_50px_rgba(0,0,0,0.08)] xl:flex-row xl:gap-10 xl:p-10">
      <div className="min-w-0 flex-1 xl:max-w-[380px] xl:shrink-0">
        <ul className="max-h-[min(60vh,22rem)] space-y-1 overflow-y-auto overscroll-contain pr-1 xl:max-h-[min(70vh,26rem)]">
          {dropdown.links.map((link) => (
            <li key={link.href}>
              <HeaderMegaMenuLink
                label={link.label}
                description={link.description}
                href={link.href}
                external={link.external}
                icon={link.icon}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden min-w-0 flex-1 gap-4 xl:flex">
        {dropdown.images.map((image) => (
          <div
            key={image.src}
            className="relative h-[180px] min-w-0 flex-1 overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="280px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
