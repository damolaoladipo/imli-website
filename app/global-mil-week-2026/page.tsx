import type { Metadata } from "next";

import {
  UNESCO_MIL_WEEK_URL,
  globalMilWeekPageContent,
} from "@/_data/imili/global-mil-week-2026";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";
import { GlobalMilWeekLayout } from "@/components/custom/imili/GlobalMilWeekLayout";

const pageUrl = `${siteConfig.url}/global-mil-week-2026`;
const ogImage = absoluteOgImageUrl(globalMilWeekPageContent.heroImage.src);

export const metadata: Metadata = {
  title: "Global MIL Week 2026",
  description: globalMilWeekPageContent.description,
  openGraph: {
    title: globalMilWeekPageContent.title,
    description: globalMilWeekPageContent.description,
    type: "website",
    url: pageUrl,
    images: [
      {
        url: ogImage,
        alt: globalMilWeekPageContent.heroImage.alt,
      },
    ],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: globalMilWeekPageContent.title,
    description: globalMilWeekPageContent.description,
    images: [ogImage],
  },
  alternates: { canonical: pageUrl },
};

function EventJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: globalMilWeekPageContent.title,
    description: globalMilWeekPageContent.description,
    startDate: "2026-10-24",
    endDate: "2026-10-31",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: pageUrl,
    image: ogImage,
    organizer: [
      {
        "@type": "Organization",
        name: "UNESCO",
        url: UNESCO_MIL_WEEK_URL,
      },
      {
        "@type": "Organization",
        name: siteConfig.fullName,
        url: siteConfig.url,
      },
    ],
    location: {
      "@type": "VirtualLocation",
      url: UNESCO_MIL_WEEK_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function GlobalMilWeek2026Page() {
  return (
    <>
      <EventJsonLd />
      <GlobalMilWeekLayout />
    </>
  );
}
