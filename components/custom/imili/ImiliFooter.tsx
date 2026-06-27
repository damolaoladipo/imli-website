"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

import type {
  FooterContent,
  FooterNavLink,
} from "@/_data/imili/footer";
import { SOCIAL_ARIA_LABELS } from "@/_data/imili/social-links";
import { CustomButton } from "@/components/custom/custom-button";
import { SocialIcon } from "@/components/custom/imili/social-icon";
import { UnescoLogo } from "@/components/custom/unesco-logo";
import { cn } from "@/lib/utils";

type FooterVariant = "dark" | "light";

type FooterTheme = {
  root: string;
  text: string;
  muted: string;
  heading: string;
  link: string;
  divider: string;
  social: string;
  input: string;
  subscribeButton: string;
  scrollTop: string;
  logoSrc: (content: FooterContent) => string;
};

const themes: Record<FooterVariant, FooterTheme> = {
  dark: {
    root: "bg-neutral-900 text-neutral-100",
    text: "text-neutral-100",
    muted: "text-neutral-100",
    heading: "text-neutral-100",
    link: "text-neutral-100",
    divider: "border-neutral-400/30",
    social:
      "bg-neutral-800 text-white focus-visible:ring-white focus-visible:ring-offset-neutral-900",
    input:
      "border-neutral-300 text-neutral-100 placeholder:text-neutral-400 focus-visible:ring-neutral-200/40",
    subscribeButton:
      "border-neutral-100 bg-transparent text-neutral-100 hover:border-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900",
    scrollTop: "bg-neutral-800 text-white",
    logoSrc: (content) => content.logo.src,
  },
  light: {
    root: "bg-white text-[#111111]",
    text: "text-[#111111]",
    muted: "text-[#6B7280]",
    heading: "text-[#111111]",
    link: "text-[#111111]",
    divider: "border-[#E5E7EB]",
    social:
      "bg-[#F3F4F6] text-[#111111] focus-visible:ring-[#111111] focus-visible:ring-offset-white",
    input:
      "border-[#D1D5DB] text-[#111111] placeholder:text-[#9CA3AF] focus-visible:ring-[#111111]/20",
    subscribeButton:
      "border-[#111111] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:bg-[#111111] focus-visible:text-white",
    scrollTop: "bg-[#111111] text-white",
    logoSrc: () => "/blocks/imili.svg",
  },
};

function isNavigableHref(href: string) {
  return href.length > 0 && href !== "TBD" && href !== "#";
}

function FooterLink({
  link,
  linkClassName,
  underlined = false,
}: {
  link: FooterNavLink;
  linkClassName: string;
  underlined?: boolean;
}) {
  const className = cn(
    "block text-[23px] transition-opacity hover:opacity-70",
    linkClassName,
    underlined && "underline",
  );

  if (!isNavigableHref(link.href)) {
    return <span className={className}>{link.label}</span>;
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
  variant?: FooterVariant;
};

export function ImiliFooter({ content, variant = "dark" }: ImiliFooterProps) {
  const theme = themes[variant];
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
    <footer className={theme.root}>
      <div className="container mx-auto px-4 pb-7 pt-[68px] text-left sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center justify-between gap-4">
              <Image
                src={theme.logoSrc(content)}
                alt={content.logo.alt}
                width={360}
                height={286}
                className="h-auto w-56 shrink-0 object-contain"
              />
              <UnescoLogo
                className="ml-auto shrink-0"
                imageClassName="h-14 w-auto lg:h-16"
              />
            </div>
            <p className={cn("mt-2 text-[22px]", theme.text)}>
              {content.tagline}
            </p>

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
                      className={cn(
                        "flex size-[50px] items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                        theme.social,
                      )}
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
              <h2 className={cn("text-[28px] font-semibold", theme.heading)}>
                {content.newsletter.heading}
              </h2>
            ) : null}
            {showNewsletterDescription ? (
              <p className={cn("mt-2 text-[22px] leading-relaxed", theme.text)}>
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
                className={cn(
                  "w-full flex-1 rounded-full border bg-transparent px-6 py-3.5 text-[20px] outline-none focus-visible:ring-2",
                  theme.input,
                )}
              />
              <CustomButton
                type="submit"
                icon={null}
                className={cn(
                  "shrink-0 rounded-full border font-medium",
                  theme.subscribeButton,
                )}
              >
                {content.newsletter.buttonLabel}
              </CustomButton>
            </form>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h3 className={cn("text-[22px] font-semibold", theme.heading)}>
              {pagesColumn.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {pagesColumn.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <FooterLink link={link} linkClassName={theme.link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={cn("text-[22px] font-semibold", theme.heading)}>
              {informationColumn.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {informationColumn.links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} linkClassName={theme.link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={cn("text-[22px] font-semibold", theme.heading)}>
              {contactColumn.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {content.contactLines.map((line) => (
                <li key={`${line.type}-${line.value}`}>
                  {line.href ? (
                    <a
                      href={line.href}
                      className={cn(
                        "block text-[23px] transition-opacity hover:opacity-70",
                        theme.link,
                      )}
                    >
                      {line.value}
                    </a>
                  ) : (
                    <span className={cn("block text-[23px]", theme.link)}>
                      {line.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn("mt-12 border-t pt-7", theme.divider)}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className={cn("text-[20px]", theme.muted)}>
              {content.copyright}
            </p>

            <div className="flex flex-1 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
              {content.bottomLinks.length > 0 ? (
                <div className="flex flex-wrap gap-8">
                  {content.bottomLinks.map((link) => (
                    <FooterLink
                      key={link.label}
                      link={link}
                      linkClassName={theme.link}
                      underlined
                    />
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                aria-label="Scroll to top"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  theme.scrollTop,
                  variant === "light"
                    ? "focus-visible:ring-[#111111] focus-visible:ring-offset-white"
                    : "focus-visible:ring-white focus-visible:ring-offset-neutral-900",
                )}
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
