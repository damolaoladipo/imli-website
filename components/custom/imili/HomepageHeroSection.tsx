import {
  homepageHeroContent,
  homepageHeroVariant,
} from "@/_data/imili/homepage-hero";
import { BackgroundPhotoHeroSection } from "./BackgroundPhotoHeroSection";
import { BentoHeroSection } from "./BentoHeroSection";
import { PhotoHeroSection } from "./PhotoHeroSection";

export function HomepageHeroSection() {
  switch (homepageHeroVariant) {
    case "bento":
      return <BentoHeroSection content={homepageHeroContent.bento} />;
    case "photo":
      return <PhotoHeroSection content={homepageHeroContent.photo} />;
    case "background":
      return <BackgroundPhotoHeroSection content={homepageHeroContent.background} />;
  }
}
