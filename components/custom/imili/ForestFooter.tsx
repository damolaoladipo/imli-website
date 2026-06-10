"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import type {
  ForestFooterContent,
  ForestFooterNavLink,
  ForestFooterSocialId,
} from "@/_data/imili/forest-footer";
import { cn } from "@/lib/utils";

const socialIcons: Record<
  ForestFooterSocialId,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

function isNavigableHref(href: string) {
  return href.length > 0 && href !== "TBD" && href !== "#";
}

function ForestNavLink({ link }: { link: ForestFooterNavLink }) {
  const className = cn(
    "block text-[13px] text-[#6B7280] transition-opacity hover:opacity-70 lg:text-[18px]",
    link.underlined && "underline",
  );

  if (!isNavigableHref(link.href)) {
    return <span className={className}>{link.label}</span>;
  }

  if (link.href.startsWith("http")) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

type GridCellProps = {
  className?: string;
  title: string;
  children: React.ReactNode;
};

function GridCell({ className, title, children }: GridCellProps) {
  return (
    <div className={cn("p-4 lg:p-6", className)}>
      <h3 className="text-[15px] font-semibold text-[#111111] lg:text-[21px]">
        {title}
      </h3>
      {children}
    </div>
  );
}

type ForestFooterProps = {
  content: ForestFooterContent;
};

export function ForestFooter({ content }: ForestFooterProps) {
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="relative min-h-[396px] w-full overflow-hidden lg:min-h-[556px]">
      <Image
        src={content.background.src}
        alt={content.background.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative z-10 flex w-full flex-col gap-4 px-4 py-6 md:px-[45px] md:py-[34px] lg:flex-row lg:items-stretch lg:gap-0">
        <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-7 lg:w-[52%] lg:rounded-[28px] lg:p-10">
          <Image
            src={content.logo.src}
            alt={content.logo.alt}
            width={360}
            height={286}
            className="h-8 w-auto shrink-0 object-contain object-left lg:h-11"
          />

          <h2 className="mt-4 text-[28px] font-semibold leading-[1.15] text-[#111111] lg:mt-6 lg:text-[39px]">
            {content.newsletter.headlineBefore}
            <span className="font-serif font-normal italic">
              {content.newsletter.headlineEmphasis}
            </span>
            <span className="font-bold">{content.newsletter.headlineAfter}</span>
          </h2>

          <p className="mt-3 text-sm text-[#6B7280] lg:mt-4 lg:text-[20px]">
            {content.newsletter.subtext}
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-5 flex items-center rounded-full border border-[#D1D5DB] bg-white lg:mt-8"
          >
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={content.newsletter.placeholder}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base outline-none placeholder:text-[#9CA3AF] lg:px-6 lg:py-4 lg:text-[18px]"
            />
            <button
              type="submit"
              className="m-1 shrink-0 rounded-full bg-[#4FAF50] px-5 py-2.5 text-sm font-medium text-[#111111] transition-opacity hover:opacity-90 lg:px-8 lg:py-3 lg:text-[17px]"
            >
              {content.newsletter.buttonLabel}
            </button>
          </form>

          {content.attribution.length > 0 ? (
            <p className="mt-auto pt-6 text-[11px] text-[#9CA3AF] lg:pt-10 lg:text-[15px]">
              {content.attribution}
            </p>
          ) : null}
        </div>

        <div
          aria-hidden
          className="hidden shrink-0 self-center bg-white lg:-mx-1 lg:block lg:h-3 lg:w-10 xl:h-[17px] xl:w-14"
        />

        <div className="grid h-full min-h-0 flex-1 grid-cols-2 grid-rows-2 self-stretch overflow-hidden rounded-[20px] bg-white lg:rounded-[28px]">
          <GridCell
            className="border-b border-r border-[#E5E7EB]"
            title={content.pages.title}
          >
            <div className="mt-2 grid grid-cols-2 gap-x-3 lg:mt-3 lg:gap-x-4">
              {content.pages.columns.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-1.5 lg:space-y-2">
                  {column.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <ForestNavLink link={link} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </GridCell>

          <GridCell
            className="border-b border-[#E5E7EB]"
            title={content.address.title}
          >
            <div className="mt-2 space-y-3 lg:mt-3 lg:space-y-4">
              {content.address.blocks.map((block) => (
                <p
                  key={block}
                  className="text-[13px] leading-snug text-[#6B7280] lg:text-[18px]"
                >
                  {block}
                </p>
              ))}
            </div>
          </GridCell>

          <GridCell
            className="border-r border-[#E5E7EB]"
            title={content.contact.title}
          >
            <div className="mt-2 space-y-1.5 lg:mt-3 lg:space-y-2">
              {content.contact.email ? (
                <a
                  href={`mailto:${content.contact.email}`}
                  className="block text-[13px] text-[#6B7280] transition-opacity hover:opacity-70 lg:text-[18px]"
                >
                  {content.contact.email}
                </a>
              ) : null}
              {content.contact.phone ? (
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="block text-[13px] text-[#6B7280] transition-opacity hover:opacity-70 lg:text-[18px]"
                >
                  {content.contact.phone}
                </a>
              ) : null}
            </div>
          </GridCell>

          <GridCell title={content.social.title}>
            <div className="mt-2 flex gap-3 lg:mt-3 lg:gap-4">
              {content.social.links.map((social) => {
                const Icon = socialIcons[social.id];
                const isExternal = social.href.startsWith("http");

                return (
                  <a
                    key={social.id}
                    href={social.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={social.id}
                    className="text-[#111111] transition-opacity hover:opacity-70"
                  >
                    <Icon className="size-5 lg:size-7" aria-hidden />
                  </a>
                );
              })}
            </div>
          </GridCell>
        </div>
      </div>
    </footer>
  );
}
