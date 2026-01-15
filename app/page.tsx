import CallToAction from "@/components/blocks/call-to-action";
import Partners from "@/components/blocks/partners";
import { Background } from "@/components/custom/background";
import { HeroSection } from "@/components/custom/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <Background>
        <Partners />

        <CallToAction />
      </Background>
    </>
  );
}
