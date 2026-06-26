import type { Metadata } from "next";
import "./globals.css";
import { absoluteOgImageUrl, siteConfig } from "@/_data/site-config";

import { HeroHeader } from "@/components/custom/header";
import { useMont } from "@/_data/fonts";
import FooterSection from "@/components/custom/footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/essays/feed`,
    },
  },
  icons: {
    icon: [
      { url: "/blocks/imli-icon.png", type: "image/png", sizes: "512x512" },
      { url: "/blocks/imli-icon.png", type: "image/png", sizes: "32x32" },
      { url: "/blocks/imli-icon.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/blocks/imli-icon.png",
    apple: [
      { url: "/blocks/imli-icon.png", type: "image/png", sizes: "180x180" },
      { url: "/blocks/imli-icon.png", type: "image/png", sizes: "512x512" },
    ],
  },
  openGraph: {
    siteName: siteConfig.name,
    images: [{ url: absoluteOgImageUrl() }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${useMont.className}  ${useMont.variable} antialiased`}
      >
        <HeroHeader />

        <main className="overflow-x-hidden">{children}</main>

        <FooterSection />
      </body>
    </html>
  );
}
