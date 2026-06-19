import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/_data/site-config";

import ForestFooterSection from "@/components/custom/forest-footer";
import { HeroHeader } from "@/components/custom/header";
import { useMont } from "@/_data/fonts";
import FooterSection from "@/components/custom/footer";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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

        <ForestFooterSection />
        <FooterSection />
      </body>
    </html>
  );
}
