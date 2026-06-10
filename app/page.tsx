import { articleCardGridReferenceContent } from "@/_data/imili/article-cards";
import { bentoHeroReferenceContent } from "@/_data/imili/bento-hero";
import { servicesReferenceContent } from "@/_data/imili/services";
import { testimonialsReferenceContent } from "@/_data/imili/testimonials";
import { AboutUs } from "@/components/custom/about-us";

import {
  ArticleCardGrid,
  BentoHeroSection,

  ServicesCarousel,
  TestimonialsCarousel,
} from "@/components/custom/imili";

export default function Home() {
  return (
    <>
      {/* feat-0007 — Bento hero */}
      <BentoHeroSection content={bentoHeroReferenceContent} />

    
        <AboutUs
          title="About the International Media and Information Literacy Institute"
          description="First international observatory dedicated to media and information literacy. The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies."
          imageSrc="/new/mision.png"
          imageAlt="IMILI observatory"
        />


          {/* feat-0006 — Services carousel */}
      <ServicesCarousel content={servicesReferenceContent} />
  

      {/* feat-0003 / feat-0004 — Article card grid + News & Blog header */}
      <ArticleCardGrid content={articleCardGridReferenceContent} />

      {/* feat-0005 — Testimonials carousel */}
      <TestimonialsCarousel content={testimonialsReferenceContent} />

    
    </>
  );
}
