"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
} from "lucide-react";

import type {
  FooterContent,
  FooterNavLink,
} from "@/_data/imili/footer";
import { SOCIAL_ARIA_LABELS } from "@/_data/imili/social-links";
import { CustomButton } from "@/components/custom/custom-button";
import { SocialIcon } from "@/components/custom/imili/social-icon";

function isNavigableHref(href: string) {
  return href.length > 0 && href !== "TBD" && href !== "#";
}

function FooterLink({
  link,
  underlined = false,
}: {
  link: FooterNavLink;
  underlined?: boolean;
}) {
  const className = [
    "block text-[21px] text-neutral-100 transition-opacity hover:opacity-70",
    underlined ? "underline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!isNavigableHref(link.href)) {
    return (
      <span
        className={[
          "block text-[21px] text-neutral-100",
          underlined ? "underline" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {link.label}
      </span>
    );
  }

  const isExternal = link.href.startsWith("http");

  if (isExternal) {
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

type ImiliFooterProps = {
  content: FooterContent;
};

export function ImiliFooter({ content }: ImiliFooterProps) {
  const [pagesColumn, informationColumn, contactColumn] = content.columns;
  const showNewsletterHeading =
    content.newsletter.heading.length > 0 &&
    content.newsletter.heading !== "TBD";
  const showNewsletterDescription =
    content.newsletter.description.length > 0 &&
    content.newsletter.description !== "TBD";

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="mx-auto container px-4 pb-7 md:px-6 pt-[68px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Image
              src={content.logo.src}
              alt={content.logo.alt}
              width={360}
              height={286}
              className="h-auto w-56 shrink-0 object-contain"
            />
            <p className="mt-2 text-[20px] text-neutral-100">{content.tagline}</p>

            {content.social.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {content.social.map((social) => {
                  const isExternal = social.href.startsWith("http");

                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={SOCIAL_ARIA_LABELS[social.id]}
                      className="flex size-[50px] items-center justify-center rounded-full bg-neutral-800 text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-none"
                    >
                      <SocialIcon id={social.id} className="size-5" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div>
            {showNewsletterHeading ? (
              <h2 className="text-[28px] font-semibold text-neutral-100">
                {content.newsletter.heading}
              </h2>
            ) : null}
            {showNewsletterDescription ? (
              <p className="mt-2 text-[20px] leading-relaxed text-neutral-100">
                {content.newsletter.description}
              </p>
            ) : null}
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={content.newsletter.placeholder}
                className="w-full flex-1 rounded-full border border-neutral-300 bg-transparent px-6 py-3.5 text-[18px] text-neutral-100 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-200/40"
              />
              <CustomButton
                type="submit"
                icon={null}
                className="shrink-0 rounded-full border border-neutral-100 bg-transparent px-8 py-3.5 text-[18px] font-medium text-neutral-100 hover:border-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900"
              >
                {content.newsletter.buttonLabel}
              </CustomButton>
            </form>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-[22px] font-semibold text-neutral-100">
              {pagesColumn.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {pagesColumn.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-neutral-100">
              {informationColumn.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {informationColumn.links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-neutral-100">
              {contactColumn.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {content.contactLines.map((line) => (
                <li key={`${line.type}-${line.value}`}>
                  {line.href ? (
                    <a
                      href={line.href}
                      className="block text-[21px] text-neutral-100 transition-opacity hover:opacity-70"
                    >
                      {line.value}
                    </a>
                  ) : (
                    <span className="block text-[21px] text-neutral-100">
                      {line.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-400/30 pt-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[18px] text-neutral-100">{content.copyright}</p>

            <div className="flex flex-1 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
              {content.bottomLinks.length > 0 ? (
                <div className="flex flex-wrap gap-8">
                  {content.bottomLinks.map((link) => (
                    <FooterLink key={link.label} link={link} underlined />
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                aria-label="Scroll to top"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-white transition-opacity hover:opacity-90"
              >
                <ArrowUp className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
