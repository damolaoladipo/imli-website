import Image from "next/image";

import type { HeaderNavDropdown } from "@/_data/imili/header-nav";
import { HeaderMegaMenuLink } from "@/components/custom/header-mega-menu-link";

type HeaderMegaMenuPanelProps = {
  dropdown: HeaderNavDropdown;
};

export function HeaderMegaMenuPanel({ dropdown }: HeaderMegaMenuPanelProps) {
  return (
    <div className="flex w-[1000px] gap-10 rounded-2xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <div className="w-[400px] shrink-0">
        <ul className="space-y-2">
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

      <div className="flex flex-1 gap-4">
        {dropdown.images.map((image) => (
          <div
            key={image.src}
            className="relative h-[200px] flex-1 overflow-hidden rounded-xl"
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
