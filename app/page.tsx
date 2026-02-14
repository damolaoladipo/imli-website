import { AboutUs } from "@/components/custom/about-us";
import CallToAction from "@/components/blocks/call-to-action";
import Partners from "@/components/blocks/partners";
import { Background } from "@/components/custom/background";
import Hero from "@/components/custom/hero";
import Impact from "@/components/custom/impact";

import { Feature2 } from "@/components/feature2";

export default function Home() {
  return (
    <>
    <Hero/>
      {/* <HeroSection /> */}

      <Background>

        <Impact/>

        <Partners />

        <AboutUs
          title="Our Vision"
          description="To collectively shape the culture of learning, leadership, and lifestyle for young people across Canada."
          imageSrc="/new/mision.png"
          imageAlt="Diverse group of young people"
      
        />
   

        <CallToAction />
      </Background>
    </>
  );
}
