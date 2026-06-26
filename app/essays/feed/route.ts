import { siteConfig } from "@/_data/site-config";
import { getPublishedEssayPages } from "@/lib/essay-source";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const sorted = [...getPublishedEssayPages()].sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  const items = sorted
    .map((page) => {
      const link = `${baseUrl}${page.url}`;
      const pubDate = new Date(page.data.date).toUTCString();
      return `<item>
  <title>${escapeXml(page.data.title)}</title>
  <link>${escapeXml(link)}</link>
  <description>${escapeXml(page.data.description ?? page.data.title)}</description>
  <pubDate>${pubDate}</pubDate>
  <guid isPermaLink="true">${escapeXml(link)}</guid>
</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Essays</title>
    <link>${baseUrl}/essays</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/essays/feed" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
