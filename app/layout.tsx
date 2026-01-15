import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/_data/site-config";

import FooterSection from "@/components/custom/footer";
import { HeroHeader } from "@/components/custom/header";
import { useMont } from "@/_data/fonts";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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

        {children}

        <FooterSection />
      </body>
    </html>
  );
}
