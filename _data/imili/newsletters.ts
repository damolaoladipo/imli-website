export type NewsletterEdition = {
  id: string;
  title: string;
  edition: string;
  slug: string;
  period: string;
  description: string;
  publishedAt: string;
  pdfUrl: string;
  tags: readonly string[];
  featured?: boolean;
};

export const newsletters: readonly NewsletterEdition[] = [
  {
    id: "imili-newsletter-april-july-2026",
    title: "IMILI Newsletter",
    edition: "Maiden Edition",
    slug: "imili-newsletter-april-july-2026",
    period: "April to July 2026",
    description:
      "We invite you to read and share the inaugural IMILI Newsletter (April to July 2026), which captures key milestones since the official launch of the world's first UNESCO Category 2 Institute dedicated to MIL.",
    publishedAt: "2026-07-31",
    pdfUrl: "/docs/IMILI-newsletter-april-july-2026.pdf",
    tags: [
      "IMILI",
      "MediaAndInformationLiteracy",
      "MIL",
      "InformationIntegrity",
      "AI",
      "DigitalLiteracy",
      "UNESCO",
      "Africa",
      "CriticalThinking",
      "Democracy",
      "Innovation",
      "AfAXP",
      "Imilinstitute",
    ],
    featured: true,
  },
];

function compareByPublishedAtDesc(
  a: NewsletterEdition,
  b: NewsletterEdition,
): number {
  return (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPublishedNewsletters(): NewsletterEdition[] {
  return [...newsletters].sort(compareByPublishedAtDesc);
}

export function getNewsletterBySlug(
  slug: string,
): NewsletterEdition | undefined {
  return newsletters.find((edition) => edition.slug === slug);
}

export function getNewsletterPath(slug: string): string {
  return `/resources/newsletter/${slug}`;
}

export function getNewsletterPageTitle(edition: NewsletterEdition): string {
  return `${edition.title} | ${edition.edition} | ${edition.period}`;
}
