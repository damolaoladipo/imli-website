import { notFound } from "next/navigation";
import { ProjectDetailLayout } from "@/components/custom/imili/ProjectDetailLayout";
import { getAfaxPStorytellingPage } from "@/lib/project-source";
import { siteConfig } from "@/_data/site-config";
import type { ProjectData } from "@/types/project";

export { generateMetadata } from "./metadata";

function AfaxPProgramJsonLd({
  title,
  description,
  date,
  url,
  image,
}: {
  title: string;
  description?: string;
  date: string;
  url: string;
  image: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    url,
    image,
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function generateStaticParams() {
  return [{ slug: ["digital-storytelling-for-peace-building"] }];
}

export default async function AfaxPProgramPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.join("/") !== "digital-storytelling-for-peace-building") {
    notFound();
  }

  const page = getAfaxPStorytellingPage();
  if (!page) notFound();

  const data = page.data as ProjectData;
  const MDX = data.body;
  const shareUrl = `${siteConfig.url}/afax-p/${slug.join("/")}`;

  return (
    <>
      <AfaxPProgramJsonLd
        title={data.title}
        description={data.description}
        date={data.date}
        url={shareUrl}
        image={`${siteConfig.url}${data.heroImage}`}
      />
      <ProjectDetailLayout data={data}>
        <MDX />
      </ProjectDetailLayout>
    </>
  );
}
