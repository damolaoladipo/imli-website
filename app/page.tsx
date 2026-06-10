import { articleCardGridHomepageContent } from "@/_data/imili/article-cards";
import { bentoHeroHomepageContent } from "@/_data/imili/bento-hero";
import { imiliHomepageAbout } from "@/_data/imili/homepage";
import { servicesReferenceContent } from "@/_data/imili/services";
import { testimonialsHomepageContent } from "@/_data/imili/testimonials";
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
      <BentoHeroSection content={bentoHeroHomepageContent} />

      <AboutUs
        title={imiliHomepageAbout.title}
        description={imiliHomepageAbout.description}
        imageSrc={imiliHomepageAbout.imageSrc}
        imageAlt={imiliHomepageAbout.imageAlt}
      />

      <ServicesCarousel content={servicesReferenceContent} />

      <ArticleCardGrid content={articleCardGridHomepageContent} />

      <TestimonialsCarousel content={testimonialsHomepageContent} />
    </>
  );
}
